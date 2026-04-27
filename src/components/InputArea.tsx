import React, { useState, useRef, useEffect } from 'react';
import { Send, Terminal, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface InputAreaProps {
  onSend: (message: string) => void;
  isLoading: boolean;
}

export function InputArea({ onSend, isLoading }: InputAreaProps) {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (input.trim() && !isLoading) {
      onSend(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  return (
    <div className="p-6 pt-0 bg-hacker-black">
      <div className="max-w-3xl mx-auto">
        <div className="flex gap-4 mb-4 items-center justify-center">
          {isLoading ? (
            <span className="animate-pulse text-[10px] tracking-widest text-white font-bold uppercase">ANALYZING...</span>
          ) : (
            <span className="text-[10px] tracking-widest text-neon-green/40 font-bold uppercase">Ready for transmission</span>
          )}
          <div className="w-24 h-[1px] bg-neon-green/30"></div>
          <span className="text-[9px] uppercase tracking-tighter opacity-40 italic text-neon-green">Secure link active</span>
        </div>
        
        <div className="relative group">
          <form onSubmit={handleSubmit}>
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              placeholder={isLoading ? "Neural Link Synchronizing..." : "Enter directive..."}
              className={cn(
                "w-full bg-[#111] border-2 border-neon-green/40 p-4 pr-14 text-sm text-neon-green focus:border-neon-green outline-none transition-all placeholder:text-neon-green/20 hacker-scrollbar resize-none",
                isLoading && "opacity-50 cursor-not-allowed"
              )}
              rows={1}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-neon-green/40 hover:text-neon-green transition-all disabled:opacity-30 active:scale-90"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5 shadow-[0_0_10px_#00FF41]" />
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
