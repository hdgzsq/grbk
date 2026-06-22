import { getPosts, getAllTags } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";
import GlassCard from "@/components/GlassCard";
import Link from "next/link";

export default function BlogPage() {
  const posts = getPosts("blog");
  const tags = getAllTags("blog");

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="mb-3 text-4xl font-bold text-[#f1f5f9] sm:text-5xl">
          <span className="gradient-text">博客文章</span>
        </h1>
        <p className="text-[#94a3b8]">技术分享与深度思考的记录</p>
      </div>
      {tags.length > 0 && (
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          <span className="text-sm text-[#64748b]">标签：</span>
          {tags.map((tag) => (
            <span key={tag} className="rounded-full bg-white/5 px-3 py-1 text-sm text-[#94a3b8] ring-1 ring-white/10">
              #{tag}
            </span>
          ))}
        </div>
      )}
      {posts.length === 0 ? (
        <GlassCard className="text-center">
          <p className="text-[#64748b]">暂无文章，快去写一篇吧！</p>
          <Link href="/content/blog" className="mt-4 inline-block text-indigo-400 hover:text-indigo-300">
            {"\u2192"} 创建第一篇文章
          </Link>
        </GlassCard>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <ArticleCard key={post.slug} {...post} type="blog" />
          ))}
        </div>
      )}
    </section>
  );
}
