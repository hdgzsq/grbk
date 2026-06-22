import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';

interface MDXRendererProps {
  content: string;
}

export default function MDXRenderer({ content }: MDXRendererProps) {
  const components = {
    a: ({ href, children }: { href?: string; children: React.ReactNode }) => {
      const isInternal = href?.startsWith('/');
      if (isInternal) {
        return <Link href={href || "/"} className="text-indigo-400 hover:text-indigo-300 underline underline-offset-4">{children}</Link>;
      }
      return <a href={href || "#"} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 underline underline-offset-4">{children}</a>;
    },
    img: ({ src, alt }: { src?: string; alt?: string }) => (
      <img src={src} alt={alt} className="my-6 rounded-xl w-full max-w-full" loading="lazy" />
    ),
  };

  return (
    <article className="prose-glass max-w-none prose-headings:text-[#f1f5f9] prose-p:text-[#cbd5e1] prose-a:text-indigo-400 prose-strong:text-[#f1f5f9] prose-code:before:content-none prose-code:after:content-none prose-code:bg-white/5 prose-code:px-2 prose-code:py-0.5 prose-code:rounded-lg prose-code:text-sm prose-pre:bg-slate-900/80 prose-pre:ring-1 prose-pre:ring-white/10 prose-li:text-[#cbd5e1]">
      <MDXRemote source={content} components={components} />
    </article>
  );
}