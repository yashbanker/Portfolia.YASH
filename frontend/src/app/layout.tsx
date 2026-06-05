import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { WhatsAppButton } from '@/components/whatsapp-button';
import { ScrollProgress } from '@/components/scroll-progress';
import { AnimatedBackground } from '@/components/animated-background';
import { SITE } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.title, template: `%s | ${SITE.name}` },
  description: SITE.description,
  keywords: ['AI Full Stack Developer', 'Next.js Developer', 'React Developer', 'SaaS Developer', 'AI Chatbot Developer', 'Yashkumar Zalavadiya'],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  openGraph: { type: 'website', locale: 'en_US', url: SITE.url, title: SITE.title, description: SITE.description, siteName: SITE.name },
  twitter: { card: 'summary_large_image', title: SITE.title, description: SITE.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [{ media: '(prefers-color-scheme: light)', color: '#ffffff' }, { media: '(prefers-color-scheme: dark)', color: '#020817' }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <AnimatedBackground />
          <ScrollProgress />
          <Navbar />
          <main className="pt-20">{children}</main>
          <Footer />
          <WhatsAppButton />
        </ThemeProvider>
      </body>
    </html>
  );
}