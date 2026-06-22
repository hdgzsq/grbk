'use client';

import { useEffect, useRef } from 'react';

export default function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createBlob = (color: string, size: string, x: string, y: string, delay: string) => {
      const div = document.createElement('div');
      div.style.cssText = `
        position: fixed; width: ${size}; height: ${size};
        border-radius: 50%; background: ${color};
        filter: blur(80px); opacity: 0.15;
        top: ${y}; left: ${x};
        animation: blob 7s infinite; animation-delay: ${delay};
        pointer-events: none; z-index: 0;
      `;
      container.appendChild(div);
    };

    createBlob('#6366f1', '400px', '10%', '20%', '0s');
    createBlob('#ec4899', '350px', '70%', '60%', '2s');
    createBlob('#06b6d4', '300px', '30%', '80%', '4s');
    createBlob('#8b5cf6', '250px', '80%', '10%', '1s');
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-10 overflow-hidden" />;
}