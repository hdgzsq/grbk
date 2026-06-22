import fs from 'fs';
import path from 'path';

const contentDir = path.join(process.cwd(), 'content');

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  tags?: string[];
  category?: string;
  mood?: string;
  status?: string;
  techStack?: string[];
  coverImage?: string;
}

function getFrontmatter(filePath: string): PostMeta {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) {
    return { slug: '', title: 'Untitled', date: new Date().toISOString().split('T')[0] };
  }
  const fm: Record<string, unknown> = {};
  match[1].split('\n').forEach((line) => {
    const [key, ...rest] = line.split(':');
    if (key && rest.length) {
      let val = rest.join(':').trim();
      val = val.replace(/^["']|["']$/g, '');
      if (val.startsWith('[')) {
        try {
          fm[key.trim()] = JSON.parse(val);
        } catch {
          fm[key.trim()] = val;
        }
      } else {
        fm[key.trim()] = val;
      }
    }
  });
  return fm as unknown as PostMeta;
}

function getMdxFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith('.mdx') || f.endsWith('.md'));
}

export function getPosts(type: 'blog' | 'diary' | 'devlog'): PostMeta[] {
  const dir = path.join(contentDir, type);
  const files = getMdxFiles(dir);
  const result: PostMeta[] = [];
  files.forEach((file) => {
    const slug = file.replace(/\.(mdx|md)$/, '');
    const filePath = path.join(dir, file);
    const meta = getFrontmatter(filePath);
    result.push({ ...meta, slug });
  });
  return result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(type: 'blog' | 'diary' | 'devlog', slug: string): PostMeta | null {
  const dir = path.join(contentDir, type);
  const files = getMdxFiles(dir);
  for (const file of files) {
    const fSlug = file.replace(/\.(mdx|md)$/, '');
    if (fSlug === slug) {
      const meta = getFrontmatter(path.join(dir, file));
      return { ...meta, slug: fSlug };
    }
  }
  return null;
}

export function getAllTags(type: 'blog' | 'diary' | 'devlog'): string[] {
  const posts = getPosts(type);
  const tagSet = new Set<string>();
  posts.forEach((p) => {
    const tags = p.tags || [];
    tags.forEach((t) => tagSet.add(t));
  });
  return Array.from(tagSet).sort();
}

export function getAllMoodValues(): string[] {
  const posts = getPosts('diary');
  const moodSet = new Set<string>();
  posts.forEach((p) => {
    if (p.mood) moodSet.add(p.mood);
  });
  return Array.from(moodSet).sort();
}
