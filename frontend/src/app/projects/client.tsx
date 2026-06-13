'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ExternalLink, Github, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const CATEGORIES = ['All', 'AI', 'SaaS', 'Web Apps', 'Ecommerce', 'Dashboard', 'WordPress'];
const PAGE_SIZE = 6;

export function ProjectsClient({ projects }: { projects: any[] }) {
  const [cat, setCat] = useState('All');
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const lower = q.toLowerCase().trim();
    return projects.filter((p) => {
      const matchCat = cat === 'All' || p.category === cat;
      const matchQ = !lower || p.title.toLowerCase().includes(lower) || p.description.toLowerCase().includes(lower) || p.technologies?.some((t: string) => t.toLowerCase().includes(lower));
      return matchCat && matchQ;
    });
  }, [projects, cat, q]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 mb-10">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} placeholder="Search projects, technologies..." className="pl-10" />
        </div>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button key={c} onClick={() => { setCat(c); setPage(1); }}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all border ${cat === c ? 'bg-blue-500 border-blue-500 text-white shadow-lg shadow-blue-500/30' : 'border-border text-muted-foreground hover:border-blue-500/40 hover:text-foreground'}`}>{c}</button>
          ))}
        </div>
      </div>
      <AnimatePresence mode="popLayout">
        {pageItems.length === 0 ? (
          <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-20 text-muted-foreground"><p>No projects found.</p></motion.div>
        ) : (
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pageItems.map((p, i) => (
              <motion.article layout key={p._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.3, delay: i * 0.05 }}
                className="group rounded-2xl overflow-hidden border border-border bg-card hover:border-blue-500/40 transition-all flex flex-col">
                <Link href={`/projects/${p.slug}`} className="block">
                  <div className="aspect-[16/10] bg-gradient-to-br from-blue-500/20 via-indigo-500/10 to-cyan-500/20 relative overflow-hidden">
                    {p.thumbnail && p.thumbnail !== '' ? (
                      <img src={p.thumbnail} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-grid-pattern bg-[size:30px_30px] opacity-30" />
                        <div className="absolute inset-0 flex items-center justify-center p-4"><div className="text-center"><Badge variant="glass" className="mb-2">{p.category}</Badge><h3 className="text-lg font-bold line-clamp-2">{p.title}</h3></div></div>
                      </>
                    )}
                  </div>
                </Link>
                <div className="p-5 flex-1 flex flex-col">
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{p.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">{p.technologies?.slice(0, 3).map((t: string) => (<span key={t} className="text-[10px] px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground">{t}</span>))}</div>
                  <div className="flex items-center justify-between mt-auto">
                    <Link href={`/projects/${p.slug}`} className="text-xs font-medium text-blue-400 inline-flex items-center gap-1 hover:gap-2 transition-all">Case Study <ArrowRight className="w-3 h-3" /></Link>
                    <div className="flex gap-2">
                      {p.liveUrl && p.liveUrl !== '#' && (<a href={p.liveUrl} target="_blank" rel="noopener" className="text-muted-foreground hover:text-blue-400"><ExternalLink className="w-4 h-4" /></a>)}
                      {p.githubUrl && p.githubUrl !== '#' && (<a href={p.githubUrl} target="_blank" rel="noopener" className="text-muted-foreground hover:text-blue-400"><Github className="w-4 h-4" /></a>)}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-12">
          <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</Button>
          {Array.from({ length: totalPages }).map((_, i) => (<Button key={i} variant={page === i + 1 ? 'default' : 'outline'} size="sm" onClick={() => setPage(i + 1)}>{i + 1}</Button>))}
          <Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</Button>
        </div>
      )}
    </>
  );
}