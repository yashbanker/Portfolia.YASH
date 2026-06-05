'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockProjects } from '@/lib/mock-data';

export function FeaturedProjects({ projects }: { projects?: any[] }) {
  const items = (projects || mockProjects).filter((p) => p.featured).slice(0, 4);
  return (
    <section className="section-padding">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <Badge className="mb-4">Featured Work</Badge>
            <h2 className="heading-2">Recent <span className="gradient-text">Projects</span></h2>
            <p className="text-muted-foreground mt-3 max-w-2xl">A selection of products I've designed and engineered for startups, agencies, and growing businesses.</p>
          </div>
          <Button asChild variant="outline"><Link href="/projects">View all projects <ArrowRight className="w-4 h-4" /></Link></Button>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-6">
          {items.map((p, i) => (
            <motion.article key={p._id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="group relative rounded-2xl overflow-hidden border border-border bg-card hover:border-blue-500/40 transition-all">
              <Link href={`/projects/${p.slug}`}>
                <div className="aspect-[16/10] overflow-hidden bg-gradient-to-br from-blue-500/20 via-indigo-500/10 to-cyan-500/20 relative">
                  <div className="absolute inset-0 bg-grid-pattern bg-[size:30px_30px] opacity-30" />
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <div className="text-center"><Badge variant="glass" className="mb-3">{p.category}</Badge><h3 className="text-xl md:text-2xl font-bold mb-2 line-clamp-2">{p.title}</h3></div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-6">
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{p.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">{p.technologies.slice(0, 4).map((t: string) => (<span key={t} className="text-xs px-2 py-1 rounded-md bg-secondary text-secondary-foreground">{t}</span>))}</div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-400 inline-flex items-center gap-1 group-hover:gap-2 transition-all">View case study <ArrowRight className="w-4 h-4" /></span>
                    <div className="flex gap-2">
                      {p.liveUrl && p.liveUrl !== '#' && (<a href={p.liveUrl} target="_blank" rel="noopener" onClick={(e) => e.stopPropagation()} className="text-muted-foreground hover:text-blue-400"><ExternalLink className="w-4 h-4" /></a>)}
                      {p.githubUrl && p.githubUrl !== '#' && (<a href={p.githubUrl} target="_blank" rel="noopener" onClick={(e) => e.stopPropagation()} className="text-muted-foreground hover:text-blue-400"><Github className="w-4 h-4" /></a>)}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}