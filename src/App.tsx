/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Sidebar } from './components/Sidebar';
import { Hero } from './components/Hero';
import { Message } from './components/Message';
import { InputArea } from './components/InputArea';
import { chatWithMistral } from './services/aiService';
import { Message as MessageType, ChatSession } from './types';
import { cn } from './lib/utils';

export default function App() {
  const [sessions, setSessions] = useState<ChatSession[]>(() => {
    const saved = localStorage.getItem('hacker_gpt_sessions');
    return saved ? JSON.parse(saved) : [];
  });
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const activeSession = sessions.find((s) => s.id === activeId);

  useEffect(() => {
    localStorage.setItem('hacker_gpt_sessions', JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activeSession?.messages, isLoading]);

  const handleNewChat = () => {
    const newSession: ChatSession = {
      id: crypto.randomUUID(),
      title: 'NEW_LOG_' + new Date().toLocaleTimeString([], { hour12: false }),
      messages: [],
      createdAt: Date.now(),
    };
    setSessions([newSession, ...sessions]);
    setActiveId(newSession.id);
  };

  const handleSendMessage = async (content: string) => {
    let currentActiveId = activeId;
    
    // Create new session if none active
    if (!currentActiveId) {
      const newSession: ChatSession = {
        id: crypto.randomUUID(),
        title: content.slice(0, 30) + (content.length > 30 ? '...' : ''),
        messages: [],
        createdAt: Date.now(),
      };
      setSessions([newSession, ...sessions]);
      setActiveId(newSession.id);
      currentActiveId = newSession.id;
    }

    const userMessage: MessageType = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      timestamp: Date.now(),
    };

    setSessions(prev => 
      prev.map(s => s.id === currentActiveId ? { ...s, messages: [...s.messages, userMessage] } : s)
    );

    setIsLoading(true);

    try {
      const history = sessions.find(s => s.id === currentActiveId)?.messages.map(m => ({
        role: m.role,
        content: m.content,
      })) || [];

      const aiResponse = await chatWithMistral(content, history);
      
      const assistantMessage: MessageType = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: aiResponse,
        timestamp: Date.now(),
      };

      setSessions(prev => 
        prev.map(s => s.id === currentActiveId ? { ...s, messages: [...s.messages, assistantMessage] } : s)
      );
    } catch (error) {
      const errorMessage: MessageType = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: "CRITICAL_SYSTEM_ERROR: " + (error instanceof Error ? error.message : "Handshake failed."),
        timestamp: Date.now(),
      };
      setSessions(prev => 
        prev.map(s => s.id === currentActiveId ? { ...s, messages: [...s.messages, errorMessage] } : s)
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-hacker-black font-mono overflow-hidden border-4 border-neon-green/20 select-none relative">
      {/* Scanline Effect Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[100]">
        <div className="scanline" />
      </div>

      {/* Watermark Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] rotate-[-15deg] overflow-hidden z-0">
        <span className="text-[120px] font-black whitespace-nowrap">BIKASH BINDHANI</span>
      </div>

      <Sidebar 
        sessions={sessions} 
        activeSessionId={activeId} 
        onNewChat={handleNewChat} 
        onSelectSession={setActiveId} 
      />

      <main className="flex-1 flex flex-col relative h-full bg-hacker-black z-10">
        {/* Top Navbar */}
        <header className="h-16 border-b border-neon-green/20 flex items-center justify-between px-8 bg-hacker-black/80 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <span className="text-[10px] uppercase tracking-widest opacity-60 text-neon-green">System Status:</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-neon-green shadow-[0_0_5px_#00FF41] animate-pulse"></div>
              <span className="text-[10px] uppercase tracking-tighter text-neon-green">Neural Link Active</span>
            </div>
          </div>
          <div className="text-[11px] uppercase tracking-[0.2em] opacity-40 text-neon-green">v1.0.4-Stable</div>
        </header>

        <div className="flex-1 overflow-y-auto hacker-scrollbar p-4" ref={scrollRef}>
          {activeSession && activeSession.messages.length > 0 ? (
            <div className="max-w-3xl mx-auto py-8">
              {activeSession.messages.map((m) => (
                <Message key={m.id} message={m} />
              ))}
              {isLoading && (
                <div className="flex gap-4 items-center animate-pulse px-4 mt-4">
                  <span className="text-[10px] font-mono text-neon-green uppercase tracking-widest">ANALYZING_PACKETS...</span>
                </div>
              )}
            </div>
          ) : (
            <Hero />
          )}
        </div>

        <InputArea onSend={handleSendMessage} isLoading={isLoading} />
        
        <footer className="p-4 flex flex-col items-center justify-center gap-2 border-t border-neon-green/10 bg-black/60">
          <div className="text-center text-[10px] tracking-[0.2em] text-white/50 uppercase">
            Developed by <span className="text-neon-green">Bikash Bindhani</span> | Follow on <a href="https://www.instagram.com/m.ilo_b" target="_blank" rel="noopener noreferrer" className="underline hover:text-neon-green transition-colors">Instagram</a>
          </div>
        </footer>
      </main>
    </div>
  );
}

