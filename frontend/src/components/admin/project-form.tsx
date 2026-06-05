'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { api, tokenStore } from '@/lib/api';

const CATEGORIES = ['AI', 'SaaS', 'Web Apps', 'Ecommerce', 'Dashboard', 'WordPress'];

export function ProjectForm({ initial, id }: { initial?: any; id?: string }) {
  const router = useRouter();
  const [form, setForm] = useState({ title: initial?.title || '', category: initial?.category || 'Web Apps', description: initial?.description || '', longDescription: initial?.longDescription || '', challenges: initial?.challenges || '', solution: initial?.solution || '', results: initial?.results || '', technologies: initial?.technologies?.join(', ') || '', liveUrl: initial?.liveUrl || '', githubUrl: initial?.githubUrl || '', featured: initial?.featured || false });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const handleChange = (e: any) => { const { name, value, type, checked } = e.target; setForm({ ...form, [name]: type === 'checkbox' ? checked : value }); };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true); setError('');
    const payload = { ...form, technologies: form.technologies.split(',').map((t: string) => t.trim()).filter(Boolean) };
    try { const token = tokenStore.get() || undefined; if (id) await api.put(`/projects/${id}`, payload, token); else await api.post('/projects', payload, token); router.push('/admin/projects'); }
    catch (err: any) { setError(err.message); setSaving(false); }
  };

  return (
    <div className="container py-10 max-w-3xl">
      <Link href="/admin/projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-blue-400 mb-6"><ArrowLeft className="w-4 h-4" /> Back to projects</Link>
      <h1 className="text-3xl font-bold mb-8">{id ? 'Edit Project' : 'New Project'}</h1>
      <Card className="glass p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div><label className="text-sm font-medium mb-1.5 block">Title *</label><Input name="title" required value={form.title} onChange={handleChange} /></div>
          <div className="grid md:grid-cols-2 gap-4">
            <div><label className="text-sm font-medium mb-1.5 block">Category *</label><select name="category" value={form.category} onChange={handleChange} className="flex h-11 w-full rounded-lg border border-border bg-background/50 px-4 py-2 text-sm">{CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}</select></div>
            <div className="flex items-center gap-2 pt-7"><input id="featured" type="checkbox" name="featured" checked={form.featured} onChange={handleChange} className="w-4 h-4 rounded accent-blue-500" /><label htmlFor="featured" className="text-sm font-medium">Featured project</label></div>
          </div>
          <div><label className="text-sm font-medium mb-1.5 block">Short Description *</label><Textarea name="description" required rows={2} value={form.description} onChange={handleChange} /></div>
          <div><label className="text-sm font-medium mb-1.5 block">Long Description</label><Textarea name="longDescription" rows={3} value={form.longDescription} onChange={handleChange} /></div>
          <div className="grid md:grid-cols-3 gap-4"><div><label className="text-sm font-medium mb-1.5 block">Challenges</label><Textarea name="challenges" rows={4} value={form.challenges} onChange={handleChange} /></div><div><label className="text-sm font-medium mb-1.5 block">Solution</label><Textarea name="solution" rows={4} value={form.solution} onChange={handleChange} /></div><div><label className="text-sm font-medium mb-1.5 block">Results</label><Textarea name="results" rows={4} value={form.results} onChange={handleChange} /></div></div>
          <div><label className="text-sm font-medium mb-1.5 block">Technologies (comma-separated)</label><Input name="technologies" value={form.technologies} onChange={handleChange} placeholder="Next.js, TypeScript, MongoDB" /></div>
          <div className="grid md:grid-cols-2 gap-4"><div><label className="text-sm font-medium mb-1.5 block">Live URL</label><Input name="liveUrl" value={form.liveUrl} onChange={handleChange} /></div><div><label className="text-sm font-medium mb-1.5 block">GitHub URL</label><Input name="githubUrl" value={form.githubUrl} onChange={handleChange} /></div></div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <div className="flex gap-3 pt-4"><Button type="submit" disabled={saving}>{saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</> : <><Save className="w-4 h-4" /> {id ? 'Update' : 'Create'} Project</>}</Button><Button asChild type="button" variant="outline"><Link href="/admin/projects">Cancel</Link></Button></div>
        </form>
      </Card>
    </div>
  );
}