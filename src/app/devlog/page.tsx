import { getPosts, getAllTags } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";
import GlassCard from "@/components/GlassCard";

export default function DevlogPage() {
  const posts = getPosts("devlog");
  const tags = getAllTags("devlog");

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="mb-3 text-4xl font-bold text-[#f1f5f9] sm:text-5xl">
          <span className="gradient-text">开发记录</span>
        </h1>
        <p className="text-[#94a3b8]">项目迭代、踩坑总结与技术复盘</p>
      </div>
      {tags.length > 0 && (
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          <span className="text-sm text-[#64748b]">技术栈：</span>
          {tags.map((tag) => (
            <span key={tag} className="rounded-full bg-cyan-500/10 px-3 py-1 text-sm text-cyan-400">
              {tag}
            </span>
          ))}
        </div>
      )}
      {posts.length === 0 ? (
        <GlassCard className="text-center">
          <p className="text-[#64748b]">还没有开发记录，开始记录你的第一个项目吧！</p>
        </GlassCard>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (<ArticleCard key={post.slug} {...post} type="devlog" />))}
        </div>
      )}
    </section>
  );
}
