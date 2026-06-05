'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { api, tokenStore } from '@/lib/api';
import { ProjectForm } from '@/components/admin/project-form';

export default function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = (params as any);
  const router = useRouter();
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    if (!tokenStore.get()) { router.push('/admin/login'); return; }
    api.get('/projects?limit=200').then((r) => { const p = r.data.find((x: any) => x._id === id); if (!p) router.push('/admin/projects'); else setProject(p); }).catch(() => router.push('/admin/projects'));
  }, [id, router]);

  if (!project) return (<div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-blue-400" /></div>);
  return <ProjectForm initial={project} id={id} />;
}