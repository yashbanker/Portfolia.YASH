'use client';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { mockTestimonials } from '@/lib/mock-data';

export function TestimonialsSection({ items }: { items?: any[] }) {
  const data = items || mockTestimonials;
  return (
    <section className="section-padding">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-3xl mx-auto mb-12">
          <Badge className="mb-4">Testimonials</Badge>
          <h2 className="heading-2 mb-4">What Clients <span className="gradient-text">Say</span></h2>
          <p className="text-muted-foreground">Honest feedback from startups, agencies, and businesses I've worked with.</p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.slice(0, 6).map((t, i) => (
            <motion.div key={t._id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="glass rounded-2xl p-6 relative hover:border-blue-500/40 transition-all">
              <Quote className="absolute top-4 right-4 w-8 h-8 text-blue-500/20" />
              <div className="flex gap-1 mb-4">{Array.from({ length: t.rating }).map((_, idx) => (<Star key={idx} className="w-4 h-4 fill-yellow-400 text-yellow-400" />))}</div>
              <p className="text-sm leading-relaxed mb-6 text-muted-foreground">"{t.feedback}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold text-sm">{t.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}</div>
                <div><p className="font-semibold text-sm">{t.name}</p><p className="text-xs text-muted-foreground">{t.role}{t.company ? ` · ${t.company}` : ''}</p></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}