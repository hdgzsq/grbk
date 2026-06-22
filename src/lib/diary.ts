import { getPosts } from './articles';

export function getDiaryGroupedByYearMonth() {
  const posts = getPosts('diary');
  const groups: Record<string, typeof posts> = {};
  posts.forEach((post) => {
    const d = new Date(post.date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const key = `${year}-${month}`;
    if (!groups[key]) groups[key] = [];
    groups[key].push(post);
  });
  return groups;
}
