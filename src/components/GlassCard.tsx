'use client';

import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: 'purple' | 'pink' | 'cyan' | 'none';
  delay?: number;
}

const glowMap = {
  purple: 'hover:glow-purple',
  pink: 'hover:glow-pink',
  cyan: 'hover:glow-cyan',
  none: '',
};

export default function GlassCard({ children, className = '', glow = 'none', delay = 0 }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`glass rounded-2xl p-6 transition-all duration-300 ${glowMap[glow]} ${className}`}
    >
      {children}
    </motion.div>
  );
}