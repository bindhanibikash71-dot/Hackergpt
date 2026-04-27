import React from 'react';
import ReactMarkdown from 'react-markdown';
import { User, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { CodeBlock } from './CodeBlock';
import { cn } from '../lib/utils';
import { Message as MessageType } from '../types';

interface MessageProps {
  message: MessageType;
}

export function Message({ message }: MessageProps) {
  const isAssistant = message.role === 'assistant';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex w-full mb-8 last:mb-0",
        isAssistant ? "justify-start" : "justify-end"
      )}
    >
      <div className={cn(
        "flex max-w-[90%] md:max-w-[85%] flex-col gap-2",
        isAssistant ? "items-start" : "items-end"
      )}>
        <div className={cn(
          "px-4 py-4 border relative group overflow-hidden",
          isAssistant 
            ? "border-neon-green/40 bg-black text-neon-green" 
            : "border-neon-green/20 bg-neon-green/5 text-neon-green/80"
        )}>
          {isAssistant && (
            <div className="flex justify-between items-center mb-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                <div className="w-2 h-2 rounded-full bg-neon-green/50"></div>
              </div>
              <div className="text-[10px] font-mono opacity-50 uppercase tracking-widest">
                INCOMING_DATA
              </div>
            </div>
          )}
          
          <div className="prose prose-invert prose-emerald max-w-none prose-sm leading-relaxed font-mono">
            <ReactMarkdown
              components={{
                code({ inline, className, children, ...props }: any) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <CodeBlock 
                      code={String(children).replace(/\n$/, '')} 
                      language={match[1]} 
                    />
                  ) : (
                    <code className={cn("bg-neon-green/20 text-neon-green px-1 py-0.5 rounded font-mono", className)} {...props}>
                      {children}
                    </code>
                  );
                },
                p({ children }) {
                  return <p className="mb-2 last:mb-0 text-neon-green/90">{children}</p>;
                }
              }}
            >
              {(isAssistant ? "" : "$ ") + message.content}
            </ReactMarkdown>
          </div>
          
          <div className={cn(
            "mt-4 text-[8px] font-mono uppercase tracking-[0.2em] opacity-30 flex justify-between",
            isAssistant ? "flex-row" : "flex-row-reverse"
          )}>
            <span>{isAssistant ? "HackerGPT_Node" : "User_Node"}</span>
            <span>{new Date(message.timestamp).toLocaleTimeString([], { hour12: false })}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
