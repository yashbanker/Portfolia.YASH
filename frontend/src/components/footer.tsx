import Link from 'next/link';
import { Github, Linkedin, Twitter, Mail, Sparkles } from 'lucide-react';
import { SITE } from '@/lib/utils';

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-card/30 mt-20">
      <div className="container py-16">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center"><Sparkles className="w-5 h-5 text-white" /></div>
              <span className="font-bold text-lg">Yash<span className="gradient-text">kumar</span></span>
            </Link>
            <p className="text-muted-foreground max-w-md text-sm leading-relaxed">AI Full-Stack Developer building modern web apps, SaaS platforms, AI chatbots, and business automation. Available worldwide for freelance projects.</p>
            <div className="flex gap-3 mt-6">
              <a href={SITE.github} target="_blank" rel="noopener" className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:text-blue-400 transition-colors"><Github className="w-5 h-5" /></a>
              <a href={SITE.linkedin} target="_blank" rel="noopener" className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:text-blue-400 transition-colors"><Linkedin className="w-5 h-5" /></a>
              <a href={SITE.twitter} target="_blank" rel="noopener" className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:text-blue-400 transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href={`mailto:${SITE.email}`} className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:text-blue-400 transition-colors"><Mail className="w-5 h-5" /></a>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-sm">Navigation</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-blue-400">Home</Link></li>
              <li><Link href="/about" className="hover:text-blue-400">About</Link></li>
              <li><Link href="/services" className="hover:text-blue-400">Services</Link></li>
              <li><Link href="/projects" className="hover:text-blue-400">Projects</Link></li>
              <li><Link href="/contact" className="hover:text-blue-400">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-sm">Services</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Web Development</li><li>SaaS Platforms</li><li>AI Integrations</li><li>Business Automation</li><li>Dashboards & CRMs</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Yashkumar Zalavadiya. All rights reserved.</p>
          <p>Built with Next.js 15, TypeScript & Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}