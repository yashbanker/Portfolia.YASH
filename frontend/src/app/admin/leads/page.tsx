'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2, ArrowLeft, Mail, Phone, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { api, tokenStore } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';

const STATUS_OPTIONS = ['new', 'contacted', 'closed'];

export default function AdminLeads() {
  const router = useRouter();
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('');
  const [expandedId, setExpandedId] = useState('');

  const load = async () => {
    const token = tokenStore.get();
    if (!token) { router.push('/admin/login'); return; }
    try { const q = filter ? `?status=${filter}` : ''; const res = await api.get(`/leads${q}`, token); setLeads(res.data || []); } catch { tokenStore.clear(); router.push('/admin/login'); } finally { setLoading(false); }
  };
  useEffect(() => { load(); }, [filter]);

  const updateStatus = async (id: string, status: string) => { try { const res = await api.patch(`/leads/${id}`, { status }, tokenStore.get() || undefined); setLeads(leads.map((l) => (l._id === id ? res.data : l))); } catch (err: any) { alert(err.message); } };
  const handleDelete = async (id: string) => { if (!confirm('Delete this lead permanently?')) return; try { await api.delete(`/leads/${id}`, tokenStore.get() || undefined); setLeads(leads.filter((l) => l._id !== id)); } catch (err: any) { alert(err.message); } };

  if (loading) return (<div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-blue-400" /></div>);

  return (
    <div className="container py-10">
      <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-blue-400 mb-6"><ArrowLeft className="w-4 h-4" /> Back to dashboard</Link>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div><h1 className="text-3xl font-bold mb-1">Contact Leads</h1><p className="text-sm text-muted-foreground">{leads.length} lead{leads.length !== 1 ? 's' : ''}</p></div>
        <div className="flex gap-2">
          <button onClick={() => setFilter('')} className={`px-3 py-1.5 rounded-full text-xs border ${!filter ? 'bg-blue-500 border-blue-500 text-white' : 'border-border text-muted-foreground'}`}>All</button>
          {STATUS_OPTIONS.map((s) => (<button key={s} onClick={() => setFilter(s)} className={`px-3 py-1.5 rounded-full text-xs border capitalize ${filter === s ? 'bg-blue-500 border-blue-500 text-white' : 'border-border text-muted-foreground'}`}>{s}</button>))}
        </div>
      </div>
      <div className="grid gap-3">
        {leads.length === 0 ? (<Card className="glass p-12 text-center text-muted-foreground">No leads found.</Card>) :
          leads.map((l) => (
            <Card key={l._id} className="glass p-5">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-2"><p className="font-semibold">{l.name}</p><Badge variant={l.status === 'new' ? 'success' : l.status === 'closed' ? 'outline' : 'default'} className="capitalize text-[10px]">{l.status}</Badge><span className="text-xs text-muted-foreground">{formatDate(l.createdAt)}</span></div>
                  <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                    <a href={`mailto:${l.email}`} className="inline-flex items-center gap-1 hover:text-blue-400"><Mail className="w-3 h-3" /> {l.email}</a>
                    {l.phone && (<a href={`tel:${l.phone}`} className="inline-flex items-center gap-1 hover:text-blue-400"><Phone className="w-3 h-3" /> {l.phone}</a>)}
                    {l.company && <span>· {l.company}</span>}
                    {l.budget && <span>· Budget: {l.budget}</span>}
                    {l.projectType && <span>· {l.projectType}</span>}
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <select value={l.status} onChange={(e) => updateStatus(l._id, e.target.value)} className="h-9 rounded-md border border-border bg-background/50 px-2 text-xs capitalize">{STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}</select>
                  <Button variant="outline" size="sm" onClick={() => setExpandedId(expandedId === l._id ? '' : l._id)}>{expandedId === l._id ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}</Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(l._id)}><Trash2 className="w-3.5 h-3.5" /></Button>
                </div>
              </div>
              {expandedId === l._id && (<div className="mt-4 pt-4 border-t border-border"><p className="text-xs text-muted-foreground mb-1">Message</p><p className="text-sm whitespace-pre-wrap">{l.message}</p></div>)}
            </Card>
          ))}
      </div>
    </div>
  );
}