'use client';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Briefcase, Code2, Users, Star } from 'lucide-react';

const stats = [
  { label: 'Years of Experience', value: 5, suffix: '+', icon: Briefcase },
  { label: 'Projects Completed', value: 80, suffix: '+', icon: Code2 },
  { label: 'Technologies Used', value: 25, suffix: '+', icon: Star },
  { label: 'Client Satisfaction', value: 99, suffix: '%', icon: Users },
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v).toString() + suffix);
  useEffect(() => { if (inView) animate(count, to, { duration: 2, ease: 'easeOut' }); }, [inView, to, count]);
  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export function Stats() {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6 md:p-8 text-center group hover:border-blue-500/40 transition-colors">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <s.icon className="w-6 h-6 text-blue-400" />
              </div>
              <div className="text-3xl md:text-5xl font-bold gradient-text mb-2"><Counter to={s.value} suffix={s.suffix} /></div>
              <p className="text-xs md:text-sm text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}