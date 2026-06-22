import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="glass-subtle mt-16">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-[#64748b]">
            {'\u00A9'} {new Date().getFullYear()} 个人博客 · 用热爱记录生活与技术
          </p>
          <div className="flex items-center gap-4">
            <Link href="/blog" className="text-sm text-[#64748b] hover:text-[#818cf8] transition-colors">博客</Link>
            <Link href="/diary" className="text-sm text-[#64748b] hover:text-[#818cf8] transition-colors">日记</Link>
            <Link href="/devlog" className="text-sm text-[#64748b] hover:text-[#818cf8] transition-colors">开发记录</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}