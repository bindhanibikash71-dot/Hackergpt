import React from 'react';
import { Plus, MessageSquare } from 'lucide-react';
import { Logo } from './Logo';
import { cn } from '../lib/utils';
import { ChatSession } from '../types';

interface SidebarProps {
  sessions: ChatSession[];
  activeSessionId: string | null;
  onNewChat: () => void;
  onSelectSession: (id: string) => void;
  onClose: () => void;
}

export function Sidebar({ sessions, activeSessionId, onNewChat, onSelectSession, onClose }: SidebarProps) {
  return (
    <aside className="w-64 bg-hacker-grey border-r border-neon-green/30 flex flex-col h-full">
      <div className="p-6 relative">
        <button 
          className="md:hidden absolute top-0 right-0 p-6 text-neon-green/60 hover:text-neon-green text-2xl flex items-center justify-center min-w-[60px] min-h-[60px]" 
          onClick={(e) => {
            e.stopPropagation();
            console.log("Close button clicked");
            onClose();
          }}
        >
          ✕
        </button>
        <Logo className="mb-8" />
        
        <button
          onClick={onNewChat}
          className="w-full py-3 border border-neon-green bg-neon-green/5 hover:bg-neon-green/20 transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-tighter text-neon-green font-bold active:scale-95"
        >
          <span>+</span> NEW OPERATIVE
        </button>
      </div>

      <div className="flex-1 px-4 space-y-2 overflow-y-auto hacker-scrollbar">
        <div className="text-[10px] uppercase text-neon-green/40 mb-2 tracking-widest font-bold px-2">
          Recent Infiltrations
        </div>
        <div className="space-y-1">
          {sessions.map((session) => (
            <button
              key={session.id}
              onClick={() => onSelectSession(session.id)}
              className={cn(
                "w-full text-left p-2 transition-all cursor-pointer text-xs font-mono truncate",
                activeSessionId === session.id 
                  ? "bg-neon-green/10 border-l-2 border-neon-green text-neon-green" 
                  : "text-neon-green/60 hover:bg-neon-green/5 hover:text-neon-green"
              )}
            >
              <div className="flex items-center gap-2">
                <MessageSquare className="w-3 h-3 opacity-50" />
                <span className="truncate">{session.title}</span>
              </div>
            </button>
          ))}
          {sessions.length === 0 && (
            <div className="p-2 text-[10px] text-neon-green/20 italic font-mono px-2">
              {"// empty_buffer"}
            </div>
          )}
        </div>
      </div>

      <div className="p-4 border-t border-neon-green/20 bg-black">
        <div className="flex flex-col gap-1">
          <div className="text-[9px] uppercase tracking-widest text-neon-green/50">Developed by</div>
          <div className="text-xs font-bold text-neon-green">Bikash Bindhani</div>
          <a 
            href="https://www.instagram.com/m.ilo_b" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[9px] text-white hover:text-neon-green flex items-center gap-1 mt-1 transition-colors uppercase tracking-tight"
          >
            Follow on Instagram ↗
          </a>
        </div>
      </div>
    </aside>
  );
}
