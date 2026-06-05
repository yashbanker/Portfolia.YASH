'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { whatsappLink } from '@/lib/utils';

export function CTASection() {
  return (
    <section className="section-padding">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden glass border-blue-500/30 p-10 md:p-16 text-center">
          <div className="absolute inset-0 hero-gradient opacity-50" />
          <div className="relative z-10">
            <h2 className="heading-2 mb-4">Have a project in mind?<br /><span className="gradient-text">Let's build it together.</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">Whether you need a high-converting website, a complete SaaS platform, or AI automation to scale your operations — I'd love to hear about your project.</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg"><Link href="/contact">Start a Project <ArrowRight className="w-4 h-4" /></Link></Button>
              <Button asChild size="lg" variant="glass"><a href={whatsappLink()} target="_blank" rel="noopener"><MessageCircle className="w-4 h-4" /> Chat on WhatsApp</a></Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}