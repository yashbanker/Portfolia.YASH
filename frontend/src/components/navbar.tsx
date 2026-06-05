'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Projects' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className={cn('fixed top-0 inset-x-0 z-50 transition-all duration-300', scrolled ? 'glass border-b border-white/10 py-2' : 'bg-transparent py-4')}>
      <nav className="container flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/60 transition-shadow">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg hidden sm:block">Yash<span className="gradient-text">kumar</span></span>
        </Link>
        <ul className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <li key={l.href}>
                <Link href={l.href} className={cn('relative px-4 py-2 rounded-lg text-sm font-medium transition-colors', active ? 'text-blue-400' : 'text-muted-foreground hover:text-foreground')}>
                  {l.label}
                  {active && <motion.div layoutId="navbar-active" className="absolute inset-0 -z-10 rounded-lg bg-blue-500/10 border border-blue-500/20" transition={{ type: 'spring', stiffness: 300, damping: 30 }} />}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild size="sm" className="hidden md:inline-flex"><Link href="/contact">Hire Me</Link></Button>
          <button className="md:hidden p-2 rounded-lg hover:bg-secondary" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden overflow-hidden glass border-t border-white/10">
            <ul className="container py-4 flex flex-col gap-1">
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={cn('block px-4 py-3 rounded-lg text-sm font-medium transition-colors', pathname === l.href ? 'bg-blue-500/10 text-blue-400' : 'text-muted-foreground hover:bg-secondary')}>
                    {l.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2"><Button asChild className="w-full"><Link href="/contact">Hire Me</Link></Button></li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}