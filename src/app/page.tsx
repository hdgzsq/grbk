'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const words = ['技术', '生活', '成长', '思考', '创造'];

const menuItems = [
  { href: '/blog', icon: '\u{1F4DD}', title: '博客文章', desc: '技术分享与深度思考', color: 'from-indigo-500 to-purple-500' },
  { href: '/diary', icon: '\u{1F4D6}', title: '生活日记', desc: '记录日常点滴感悟', color: 'from-pink-500 to-rose-500' },
  { href: '/devlog', icon: '\u26A1', title: '开发记录', desc: '项目迭代与踩坑总结', color: 'from-cyan-500 to-blue-500' },
];

export default function Home() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-20 text-center"
      >
        <div className="mx-auto mb-8 flex h-32 w-32 items-center justify-center rounded-full glass-strong">
          <span className="text-4xl">{"👋"}</span>
        </div>

        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          <span className="text-[#f1f5f9]">你好，欢迎来到我的</span>
          <br />
          <span className="gradient-text">个人空间</span>
        </h1>

        <div className="mb-6 h-12 flex items-center justify-center">
          <motion.span
            key={currentWordIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="text-2xl font-light text-indigo-400 sm:text-3xl"
          >
            {words[currentWordIndex]}
          </motion.span>
        </div>

        <p className="mx-auto max-w-2xl text-lg text-[#94a3b8]">
          在这里，我记录技术探索的每一步，分享生活中的感悟与思考。
          <br />
          愿这些文字能为你带来一些启发。
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/blog"
            className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-3 font-medium text-white transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25"
          >
            <span className="relative z-10">浏览博客</span>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-purple-600 to-pink-600 transition-transform duration-300 group-hover:translate-x-0" />
          </Link>
          <Link
            href="/diary"
            className="glass rounded-xl px-8 py-3 font-medium text-[#e2e8f0] transition-all duration-300 hover:border-white/20"
          >
            查看日记
          </Link>
        </div>
      </motion.div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {menuItems.map((item, i) => (
          <motion.div
            key={item.href}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
          >
            <Link href={item.href} className="group block">
              <div className="glass rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/15">
                <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${item.color} text-xl`}>
                  {item.icon}
                </div>
                <h3 className="mb-2 text-xl font-semibold text-[#f1f5f9] group-hover:text-indigo-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-[#94a3b8]">{item.desc}</p>
                <div className="mt-4 flex items-center text-sm text-indigo-400 group-hover:text-indigo-300">
                  <span>了解更多</span>
                  <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-16 glass rounded-2xl p-8"
      >
        <h2 className="mb-6 text-center text-2xl font-semibold text-[#f1f5f9]">
          <span className="gradient-text">数据统计</span>
        </h2>
        <div className="grid grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold gradient-text">{"\u221E"}</div>
            <div className="mt-1 text-sm text-[#64748b]">创作热情</div>
          </div>
          <div>
            <div className="text-3xl font-bold gradient-text">365</div>
            <div className="mt-1 text-sm text-[#64748b]">坚持记录</div>
          </div>
          <div>
            <div className="text-3xl font-bold gradient-text">100%</div>
            <div className="mt-1 text-sm text-[#64748b]">真实分享</div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}