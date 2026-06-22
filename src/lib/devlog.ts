import { getPosts } from './articles';

export function getDevlogByStatus() {
  const posts = getPosts('devlog');
  return posts;
}

export function getDevlogTechStacks(): string[] {
  const posts = getPosts('devlog');
  const set = new Set<string>();
  posts.forEach((p) => {
    if (p.techStack) p.techStack.forEach((t) => set.add(t));
  });
  return Array.from(set).sort();
}
