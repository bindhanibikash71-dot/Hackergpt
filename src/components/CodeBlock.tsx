import React, { useState } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';
import { cn } from '../lib/utils';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = 'bash' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-4 rounded-lg overflow-hidden border border-neon-green/20 bg-hacker-grey/50 group">
      <div className="flex items-center justify-between px-4 py-2 bg-black/40 border-b border-neon-green/10">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-neon-green/70" />
          <span className="text-xs font-mono text-neon-green/70 uppercase tracking-widest leading-none">
            {language}
          </span>
        </div>
        <button
          onClick={copyToClipboard}
          className="p-1.5 rounded hover:bg-white/5 transition-colors text-white/50 hover:text-neon-green flex items-center gap-1.5 text-xs font-mono"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>COPIED!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>COPY</span>
            </>
          )}
        </button>
      </div>
      <div className="p-4 overflow-x-auto hacker-scrollbar">
        <pre className="font-mono text-sm leading-relaxed text-emerald-400">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
