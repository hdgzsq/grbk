import { notFound } from 'next/navigation';
import { getPostBySlug, getPosts } from '@/lib/articles';
import MDXRenderer from '@/components/MDXRenderer';
import ArticleCard from '@/components/ArticleCard';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join(process.cwd(), 'content', 'devlog'));
  return files
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
    .map((f) => ({ slug: f.replace(/\.(mdx|md)$/, '') }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug('devlog', slug);
  if (!post) return { title: '记录不存在' };
  return { title: `${post.title} | 个人博客` };
}

export default async function DevlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug('devlog', slug);
  if (!post) notFound();

  const rawContent = fs.readFileSync(
    path.join(process.cwd(), 'content', 'devlog', `${slug}.mdx`),
    'utf-8'
  );

  const displayDate = new Date(post.date).toLocaleDateString('zh-CN', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  const allPosts = getPosts('devlog');
  const otherPosts = allPosts.filter((p) => p.slug !== slug && p.title && p.date).slice(0, 4);

  return (
    <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <Link href="/devlog" className="mb-8 inline-flex items-center gap-2 text-sm text-[#64748b] hover:text-cyan-400 transition-colors">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        返回开发记录
      </Link>

      <header className="mb-10">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-400">开发记录</span>
          {post.status && (
            <span className={`rounded-full px-3 py-1 text-xs font-medium ${
              post.status === "进行中" ? "bg-yellow-500/10 text-yellow-400" :
              post.status === "已完成" ? "bg-green-500/10 text-green-400" :
              "bg-white/5 text-[#94a3b8]"
            }`}>
              {post.status}
            </span>
          )}
        </div>
        <h1 className="mb-4 text-3xl font-bold text-[#f1f5f9] sm:text-4xl">{post.title}</h1>
        <div className="flex items-center gap-4 text-sm text-[#64748b]">
          <time dateTime={post.date}>{displayDate}</time>
          {post.techStack && post.techStack.length > 0 && (
            <>
              <span>{'\u00B7'}</span>
              <div className="flex gap-1.5">
                {post.techStack.map((t) => (
                  <span key={t} className="rounded-full bg-white/5 px-2 py-0.5 text-xs text-[#94a3b8] ring-1 ring-white/10">{t}</span>
                ))}
              </div>
            </>
          )}
        </div>
      </header>

      <div className="mb-10 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <MDXRenderer content={rawContent} />
      <div className="mt-12 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mt-10">
        <h2 className="mb-6 text-xl font-semibold text-[#f1f5f9]">更多记录</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {otherPosts.map((p) => (
            <ArticleCard key={p.slug} title={p.title} date={p.date} slug={p.slug} excerpt={p.excerpt} tags={p.tags} type="devlog" status={p.status} />
          ))}
        </div>
      </div>
    </article>
  );
}