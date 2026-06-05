import type { Metadata } from 'next';
import { Badge } from '@/components/ui/badge';
import { api } from '@/lib/api';
import { mockProjects } from '@/lib/mock-data';
import { ProjectsClient } from './client';

export const metadata: Metadata = { title: 'Projects', description: 'Explore my portfolio of AI, SaaS, ecommerce, and web app projects.' };
export const dynamic = 'force-dynamic';
async function getProjects() { try { const res = await api.get('/projects?limit=50'); return res.data?.length ? res.data : mockProjects; } catch { return mockProjects; } }
export default async function ProjectsPage() {
  const projects = await getProjects();
  return (
    <section className="section-padding">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge className="mb-4">Portfolio</Badge>
          <h1 className="heading-1 mb-6">Selected <span className="gradient-text">Projects</span></h1>
          <p className="text-muted-foreground text-lg">A showcase of products I've designed and engineered — from AI chatbot platforms to SaaS dashboards and high-converting business websites.</p>
        </div>
        <ProjectsClient projects={projects} />
      </div>
    </section>
  );
}