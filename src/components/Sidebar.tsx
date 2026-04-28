import React from 'react';
import { MessageSquare, Plus, X } from 'lucide-react';
import { Logo } from './Logo';
import { cn } from '../lib/utils';
import { ChatSession } from '../types';

interface SidebarProps {
  sessions: ChatSession[];
  activeSessionId: string | null;
  onNewChat: () => void;
  onSelectSession: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ sessions, activeSessionId, onNewChat, onSelectSession, isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          id="sidebar-overlay"
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Drawer */}
      <aside 
        id="sidebar-drawer"
        className={cn(
          "fixed top-0 left-0 h-full w-72 bg-hacker-grey border-r border-neon-green/20 z-50 transform transition-transform duration-300 ease-in-out flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-4 flex items-center justify-between border-b border-neon-green/10">
          <Logo className="w-32" />
          <button 
            id="close-sidebar-button"
            onClick={onClose}
            className="p-2 text-neon-green/60 hover:text-neon-green transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4">
          <button
            id="new-chat-button"
            onClick={onNewChat}
            className="w-full py-3 border border-neon-green/40 hover:border-neon-green bg-hacker-black hover:bg-neon-green/5 transition-all flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest text-neon-green font-bold"
          >
            <Plus size={14} /> NEW OPERATIVE
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 space-y-2 hacker-scrollbar">
          <div className="text-[9px] uppercase text-neon-green/30 tracking-widest font-bold px-2 py-1">
            Recent Infiltrations
          </div>
          {sessions.map((session) => (
            <button
              key={session.id}
              onClick={() => {
                onSelectSession(session.id);
                onClose();
              }}
              className={cn(
                "w-full text-left p-2 transition-all cursor-pointer text-[11px] font-mono truncate flex items-center gap-2",
                activeSessionId === session.id 
                  ? "bg-neon-green/10 border-l border-neon-green text-neon-green" 
                  : "text-neon-green/60 hover:bg-neon-green/5 hover:text-neon-green"
              )}
            >
              <MessageSquare size={12} className="opacity-50" />
              <span className="truncate">{session.title}</span>
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-neon-green/10 bg-black/40">
          <div className="text-[9px] uppercase tracking-widest text-neon-green/30">Developed by</div>
          <div className="text-[10px] font-bold text-neon-green mt-1">Bikash Bindhani</div>
        </div>
      </aside>
    </>
  );
}
