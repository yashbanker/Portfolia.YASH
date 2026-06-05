'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center hero-gradient overflow-hidden">
      <div className="container relative z-10 py-16">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-5xl mx-auto text-center">
          <Badge variant="glass" className="mb-8 inline-flex items-center gap-2 px-4 py-2">
            <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" /><span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" /></span>
            <span className="text-sm">Available for new projects</span>
          </Badge>
          <h1 className="heading-1 mb-6 leading-[1.05]">
            <span className="block">AI Full-Stack Developer</span>
            <span className="block mt-2">Building <span className="gradient-text">Modern Web Apps</span></span>
            <span className="block mt-2">& Business <span className="gradient-text">Automation</span></span>
          </h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
            I help startups, agencies, and businesses ship high-converting websites, SaaS platforms, and AI-powered automation that drive real revenue — built with Next.js, TypeScript, Node.js, and OpenAI.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg"><Link href="/contact">Hire Me <ArrowRight className="w-4 h-4" /></Link></Button>
            <Button asChild size="lg" variant="glass"><Link href="/projects"><Sparkles className="w-4 h-4" /> View Projects</Link></Button>
            <Button asChild size="lg" variant="outline"><Link href="/contact"><Send className="w-4 h-4" /> Contact Me</Link></Button>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-16 flex flex-wrap items-center justify-center gap-3">
            {['Next.js 15', 'TypeScript', 'Node.js', 'MongoDB', 'OpenAI', 'Tailwind', 'Framer Motion'].map((t) => (
              <span key={t} className="px-3 py-1.5 text-xs rounded-full glass text-muted-foreground">{t}</span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}