import { getPosts, getAllMoodValues } from "@/lib/articles";
import { getDiaryGroupedByYearMonth } from "@/lib/diary";
import ArticleCard from "@/components/ArticleCard";
import GlassCard from "@/components/GlassCard";

export default function DiaryPage() {
  const posts = getPosts("diary");
  const grouped = getDiaryGroupedByYearMonth();
  const moods = getAllMoodValues();

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="mb-3 text-4xl font-bold text-[#f1f5f9] sm:text-5xl">
          <span className="gradient-text">生活日记</span>
        </h1>
        <p className="text-[#94a3b8]">记录日常点滴与生活感悟</p>
      </div>
      {moods.length > 0 && (
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          <span className="text-sm text-[#64748b]">心情：</span>
          {moods.map((mood) => (
            <span key={mood} className="rounded-full bg-pink-500/10 px-3 py-1 text-sm text-pink-400">
              {mood}
            </span>
          ))}
        </div>
      )}
      {Object.keys(grouped).length === 0 ? (
        <GlassCard className="text-center">
          <p className="text-[#64748b]">还没有日记，写下第一篇吧！</p>
        </GlassCard>
      ) : (
        <div className="space-y-10">
          {Object.entries(grouped)
            .sort(([a], [b]) => b.localeCompare(a))
            .map(([yearMonth, items]) => {
              const [year, month] = yearMonth.split("-");
              return (
                <div key={yearMonth}>
                  <div className="mb-6 flex items-center gap-4">
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    <h2 className="text-lg font-semibold text-[#94a3b8]">
                      {year}年 {parseInt(month)}月
                    </h2>
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((post) => (<ArticleCard key={post.slug} {...post} type="diary" />))}
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </section>
  );
}
