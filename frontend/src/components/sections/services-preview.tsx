'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockServices } from '@/lib/mock-data';

export function ServicesPreview({ services }: { services?: any[] }) {
  const items = (services || mockServices).slice(0, 6);
  return (
    <section className="section-padding bg-card/30">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-3xl mx-auto mb-12">
          <Badge className="mb-4">Services</Badge>
          <h2 className="heading-2 mb-4">What I <span className="gradient-text">Build</span></h2>
          <p className="text-muted-foreground">From single-page marketing sites to complex SaaS platforms with AI integrations — I deliver production-ready solutions tailored to your business.</p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((s, i) => {
            const Icon = (Icons as any)[s.icon] || Icons.Code2;
            return (
              <motion.div key={s._id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="group glass rounded-2xl p-6 hover:border-blue-500/40 transition-all hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-bold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{s.description}</p>
                <Link href="/services" className="text-sm text-blue-400 inline-flex items-center gap-1 group-hover:gap-2 transition-all">Learn more <ArrowRight className="w-4 h-4" /></Link>
              </motion.div>
            );
          })}
        </div>
        <div className="text-center mt-12"><Button asChild variant="outline" size="lg"><Link href="/services">View All Services <ArrowRight className="w-4 h-4" /></Link></Button></div>
      </div>
    </section>
  );
}