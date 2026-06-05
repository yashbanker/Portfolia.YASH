import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink, Github, Target, Lightbulb, TrendingUp, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { api } from '@/lib/api';
import { mockProjects } from '@/lib/mock-data';
import { CTASection } from '@/components/sections/cta-section';

export const dynamic = 'force-dynamic';
async function getProject(slug: string) { try { const res = await api.get(`/projects/${slug}`); return res.data; } catch { return mockProjects.find((p) => p.slug === slug) || null; } }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: 'Project not found' };
  return { title: project.title, description: project.description };
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const sections = [
    { icon: AlertCircle, title: 'The Challenge', content: project.challenges, color: 'text-amber-400', bg: 'from-amber-500/20 to-orange-500/20' },
    { icon: Lightbulb, title: 'The Solution', content: project.solution, color: 'text-blue-400', bg: 'from-blue-500/20 to-cyan-500/20' },
    { icon: TrendingUp, title: 'Results & Impact', content: project.results, color: 'text-emerald-400', bg: 'from-emerald-500/20 to-teal-500/20' },
  ].filter((s) => s.content);

  return (
    <>
      <section className="section-padding">
        <div className="container max-w-5xl">
          <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-blue-400 mb-8 transition-colors"><ArrowLeft className="w-4 h-4" /> All projects</Link>
          <div className="mb-10">
            <Badge className="mb-4">{project.category}</Badge>
            <h1 className="heading-1 mb-6">{project.title}</h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">{project.longDescription || project.description}</p>
            <div className="flex flex-wrap gap-3 mt-8">
              {project.liveUrl && project.liveUrl !== '#' && (<Button asChild><a href={project.liveUrl} target="_blank" rel="noopener"><ExternalLink className="w-4 h-4" /> Live Demo</a></Button>)}
              {project.githubUrl && project.githubUrl !== '#' && (<Button asChild variant="outline"><a href={project.githubUrl} target="_blank" rel="noopener"><Github className="w-4 h-4" /> Source Code</a></Button>)}
            </div>
          </div>
          <div className="aspect-[16/9] rounded-3xl overflow-hidden glass mb-12 bg-gradient-to-br from-blue-500/20 via-indigo-500/10 to-cyan-500/20 relative">
            <div className="absolute inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-30" />
            <div className="absolute inset-0 flex items-center justify-center p-8"><div className="text-center"><Badge variant="glass" className="mb-4">{project.category}</Badge><h3 className="text-3xl md:text-5xl font-bold gradient-text">{project.title.split('—')[0].trim()}</h3></div></div>
          </div>
          <Card className="glass p-6 mb-10">
            <h3 className="font-bold mb-4 flex items-center gap-2"><Target className="w-5 h-5 text-blue-400" /> Technologies Used</h3>
            <div className="flex flex-wrap gap-2">{project.technologies?.map((t: string) => (<span key={t} className="px-3 py-1.5 rounded-md bg-secondary text-sm">{t}</span>))}</div>
          </Card>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {sections.map((s) => (
              <Card key={s.title} className="glass p-6">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.bg} flex items-center justify-center mb-4`}><s.icon className={`w-6 h-6 ${s.color}`} /></div>
                <h3 className="font-bold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.content}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}