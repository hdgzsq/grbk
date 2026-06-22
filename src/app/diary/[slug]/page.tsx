import { notFound } from 'next/navigation';
import { getPostBySlug } from '@/lib/articles';
import MDXRenderer from '@/components/MDXRenderer';
import ArticleCard from '@/components/ArticleCard';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join(process.cwd(), 'content', 'diary'));
  return files
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
    .map((f) => ({ slug: f.replace(/\.(mdx|md)$/, '') }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug('diary', slug);
  if (!post) return { title: '日记不存在' };
  return { title: `${post.title} | 个人博客` };
}

export default async function DiaryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug('diary', slug);
  if (!post) notFound();

  const rawContent = fs.readFileSync(
    path.join(process.cwd(), 'content', 'diary', `${slug}.mdx`),
    'utf-8'
  );

  const displayDate = new Date(post.date).toLocaleDateString('zh-CN', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  // Get other diary posts safely
  const otherPosts: NonNullable<typeof post>[] = [];
  try {
    const files = fs.readdirSync(path.join(process.cwd(), 'content', 'diary'));
    for (const file of files) {
      if (file.endsWith('.mdx') || file.endsWith('.md')) {
        const s = file.replace(/\.(mdx|md)$/, '');
        if (s !== slug) {
          const p = getPostBySlug('diary', s);
          if (p && p.title && p.date) otherPosts.push(p);
        }
      }
    }
  } catch { /* ignore */ }

  return (
    <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <Link href="/diary" className="mb-8 inline-flex items-center gap-2 text-sm text-[#64748b] hover:text-pink-400 transition-colors">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        返回日记列表
      </Link>

      <header className="mb-10">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-pink-500/10 px-3 py-1 text-xs font-medium text-pink-400">日记</span>
          {post.mood && (
            <span className="rounded-full bg-pink-500/10 px-3 py-1 text-xs font-medium text-pink-400">
              {"🤔"} {post.mood}
            </span>
          )}
        </div>
        <h1 className="mb-4 text-3xl font-bold text-[#f1f5f9] sm:text-4xl">{post.title}</h1>
        <time dateTime={post.date} className="text-sm text-[#64748b]">{displayDate}</time>
      </header>

      <div className="mb-10 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <MDXRenderer content={rawContent} />
      <div className="mt-12 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mt-10">
        <h2 className="mb-6 text-xl font-semibold text-[#f1f5f9]">更多日记</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {otherPosts.slice(0, 4).map((p) => (
            <ArticleCard key={p.slug} title={p.title} date={p.date} slug={p.slug} excerpt={p.excerpt} tags={p.tags} type="diary" mood={p.mood} />
          ))}
        </div>
      </div>
    </article>
  );
}