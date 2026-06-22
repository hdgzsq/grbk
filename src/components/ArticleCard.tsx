import Link from 'next/link';

interface ArticleCardProps {
  title: string;
  date: string;
  excerpt?: string;
  tags?: string[];
  slug: string;
  type: 'blog' | 'diary' | 'devlog';
  mood?: string;
  status?: string;
}

export default function ArticleCard({ title, date, excerpt, tags, slug, type, mood, status }: ArticleCardProps) {
  const typeMap = {
    blog: { href: '/blog', label: '博客' },
    diary: { href: '/diary', label: '日记' },
    devlog: { href: '/devlog', label: '开发记录' },
  };

  const typeInfo = typeMap[type] || typeMap.blog;
  const detailHref = `${typeInfo.href}/${slug}`;
  const displayDate = new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <Link href={detailHref} className="group block">
      <div className="glass rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:glow-purple hover:border-white/15">
        <div className="mb-3 flex items-center gap-2">
          <span className="text-xs font-medium text-indigo-400">{typeInfo.label}</span>
          <span className="text-xs text-[#475569]">{"·"}</span>
          <span className="text-xs text-[#64748b]">{displayDate}</span>
          {mood && (<>
            <span className="text-xs text-[#475569]">{"·"}</span>
            <span className="text-xs text-pink-400">{mood}</span>
          </>)}
          {status && (<>
            <span className="text-xs text-[#475569]">{"·"}</span>
            <span className="text-xs text-cyan-400">{status}</span>
          </>)}
        </div>
        <h3 className="mb-2 text-lg font-semibold text-[#f1f5f9] group-hover:text-indigo-300 transition-colors line-clamp-1">{title}</h3>
        {excerpt && <p className="mb-3 text-sm leading-relaxed text-[#94a3b8] line-clamp-2">{excerpt}</p>}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.slice(0, 4).map((tag) => (
              <span key={tag} className="rounded-full bg-white/5 px-2.5 py-0.5 text-xs font-medium text-[#94a3b8] ring-1 ring-white/10">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}