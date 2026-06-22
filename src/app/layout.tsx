import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import AnimatedBackground from '@/components/AnimatedBackground';
import GradientNav from '@/components/GradientNav';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: '个人博客 | 记录生活与技术',
    template: '%s | 个人博客',
  },
  description: '个人博客、日记与技术开发记录，记录生活点滴与成长历程',
  keywords: ['博客', '日记', '技术开发', '个人记录'],
  authors: [{ name: '博主' }],
  openGraph: {
    title: '个人博客',
    description: '记录生活与技术',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '个人博客',
    description: '记录生活与技术',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className={inter.variable}>
      <body className="min-h-screen bg-[#0a0a1a] text-[#e2e8f0] font-sans antialiased">
        <AnimatedBackground />
        <div className="relative z-10 flex min-h-screen flex-col">
          <GradientNav />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
