import React from 'react';
import { cn } from '../lib/utils';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function Logo({ className, showText = true }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-3 group cursor-pointer", className)}>
      <div className="relative">
        <div className="w-8 h-8 border-2 border-neon-green flex items-center justify-center shadow-[0_0_10px_#00FF41]">
          <span className="font-black text-neon-green">H</span>
        </div>
      </div>
      {showText && (
        <span className="text-xl font-bold tracking-widest uppercase glow-text text-neon-green">
          HackerGPT
        </span>
      )}
    </div>
  );
}
