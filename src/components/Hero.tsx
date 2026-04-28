import React from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, Zap, Lock, Terminal } from 'lucide-react';
import { Logo } from './Logo';

export function Hero() {
  const features = [
    { title: "Audit Code", desc: "Analyze Bash script for vulnerabilities" },
    { title: "Learn Defense", desc: "Explain SQL injection prevention" },
    { title: "Protocol Check", desc: "How does TLS handshake work?" }
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 max-w-4xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center text-center space-y-4"
      >
        <div className="p-2 border border-neon-green bg-neon-green/5 mb-2">
          <span className="text-[10px] uppercase tracking-widest text-neon-green font-bold">Restricted Access Level 07</span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-none text-white">
          Welcome to <span className="text-neon-green glow-text">HackerGPT</span>
        </h1>
        
        <p className="text-sm text-neon-green/70 max-w-md uppercase tracking-wider font-mono">
          Your Advanced AI Cybersecurity Assistant
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl mt-8">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="p-4 border border-neon-green/20 bg-neon-green/5 text-[10px] uppercase font-mono hover:border-neon-green/50 transition-all cursor-pointer group"
          >
            <div className="mb-2 font-bold text-neon-green group-hover:glow-text">{f.title}</div>
            <span className="opacity-50 text-neon-green">{f.desc}</span>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex flex-col items-center gap-4 py-8 w-full"
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-[1px] bg-neon-green/30"></div>
          <span className="text-[9px] uppercase tracking-tighter opacity-40 italic text-neon-green">For educational purposes only</span>
          <div className="w-16 h-[1px] bg-neon-green/30"></div>
        </div>
      </motion.div>
    </div>
  );
}
