'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2, Plus, Edit, Trash2, ArrowLeft, Star, ExternalLink } from 'lucide-react';
import { api, tokenStore } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function AdminProjects() {
  const router = useRouter();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState('');

  const load = async () => {
    const token = tokenStore.get();
    if (!token) { router.push('/admin/login'); return; }
    try { const res = await api.get('/projects?limit=100'); setProjects(res.data || []); } catch {} finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    setDeletingId(id);
    try { await api.delete(`/projects/${id}`, tokenStore.get() || undefined); setProjects(projects.filter((p) => p._id !== id)); }
    catch (err: any) { alert(err.message); } finally { setDeletingId(''); }
  };

  if (loading) return (<div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-blue-400" /></div>);

  return (
    <div className="container py-10">
      <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-blue-400 mb-6"><ArrowLeft className="w-4 h-4" /> Back to dashboard</Link>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div><h1 className="text-3xl font-bold mb-1">Projects</h1><p className="text-sm text-muted-foreground">{projects.length} project{projects.length !== 1 ? 's' : ''}</p></div>
        <Button asChild><Link href="/admin/projects/new"><Plus className="w-4 h-4" /> New Project</Link></Button>
      </div>
      <div className="grid gap-3">
        {projects.length === 0 ? (<Card className="glass p-12 text-center"><p className="text-muted-foreground mb-4">No projects yet.</p><Button asChild><Link href="/admin/projects/new">Create your first project</Link></Button></Card>) :
          projects.map((p) => (
            <Card key={p._id} className="glass p-4 flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-4 min-w-0 flex-1">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/30 to-cyan-500/30 flex items-center justify-center flex-shrink-0 text-white font-bold">{p.title[0]}</div>
                <div className="min-w-0"><div className="flex items-center gap-2 flex-wrap"><p className="font-medium truncate">{p.title}</p>{p.featured && <Star className="w-3 h-3 text-amber-400 fill-amber-400" />}</div><div className="flex items-center gap-2 mt-1"><Badge variant="outline" className="text-[10px]">{p.category}</Badge><span className="text-xs text-muted-foreground">{p.technologies?.length || 0} techs</span></div></div>
              </div>
              <div className="flex gap-2">
                <Button asChild variant="outline" size="sm"><Link href={`/projects/${p.slug}`} target="_blank"><ExternalLink className="w-3.5 h-3.5" /></Link></Button>
                <Button asChild variant="outline" size="sm"><Link href={`/admin/projects/${p._id}`}><Edit className="w-3.5 h-3.5" /></Link></Button>
                <Button variant="outline" size="sm" onClick={() => handleDelete(p._id)} disabled={deletingId === p._id}>{deletingId === p._id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}</Button>
              </div>
            </Card>
          ))}
      </div>
    </div>
  );
}