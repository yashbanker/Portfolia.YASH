'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2, LogOut, Briefcase, MessageSquare, Star, Wrench, ArrowRight, FolderKanban } from 'lucide-react';
import { api, tokenStore } from '@/lib/api';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = tokenStore.get();
    if (!token) { router.push('/admin/login'); return; }
    api.get('/stats/dashboard', token).then((r) => { setStats(r.data); setLoading(false); }).catch(() => { tokenStore.clear(); router.push('/admin/login'); });
  }, [router]);

  const logout = () => { tokenStore.clear(); router.push('/admin/login'); };

  if (loading) return (<div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-blue-400" /></div>);

  const cards = [
    { label: 'Total Projects', value: stats?.counts?.projects ?? 0, icon: Briefcase, href: '/admin/projects', color: 'from-blue-500/20 to-cyan-500/20', iconColor: 'text-blue-400' },
    { label: 'Contact Leads', value: stats?.counts?.leads ?? 0, icon: MessageSquare, href: '/admin/leads', color: 'from-emerald-500/20 to-teal-500/20', iconColor: 'text-emerald-400' },
    { label: 'New Leads', value: stats?.counts?.newLeads ?? 0, icon: FolderKanban, href: '/admin/leads', color: 'from-amber-500/20 to-orange-500/20', iconColor: 'text-amber-400' },
    { label: 'Testimonials', value: stats?.counts?.testimonials ?? 0, icon: Star, href: '/admin', color: 'from-rose-500/20 to-pink-500/20', iconColor: 'text-rose-400' },
    { label: 'Services', value: stats?.counts?.services ?? 0, icon: Wrench, href: '/admin', color: 'from-indigo-500/20 to-purple-500/20', iconColor: 'text-indigo-400' },
  ];

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-10">
        <div><h1 className="text-3xl font-bold mb-1">Admin Dashboard</h1><p className="text-sm text-muted-foreground">Manage your portfolio content and leads.</p></div>
        <div className="flex gap-2"><Button asChild variant="outline" size="sm"><Link href="/">View site</Link></Button><Button onClick={logout} variant="outline" size="sm"><LogOut className="w-4 h-4" /> Logout</Button></div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
        {cards.map((c) => (
          <Link key={c.label} href={c.href}><Card className="glass p-6 hover:border-blue-500/40 transition-all group h-full"><div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}><c.icon className={`w-6 h-6 ${c.iconColor}`} /></div><p className="text-3xl font-bold mb-1">{c.value}</p><p className="text-xs text-muted-foreground">{c.label}</p></Card></Link>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="glass p-6"><h2 className="font-bold mb-4">Quick Actions</h2><div className="space-y-2">
          <Button asChild variant="outline" className="w-full justify-between"><Link href="/admin/projects">Manage Projects <ArrowRight className="w-4 h-4" /></Link></Button>
          <Button asChild variant="outline" className="w-full justify-between"><Link href="/admin/projects/new">Add New Project <ArrowRight className="w-4 h-4" /></Link></Button>
          <Button asChild variant="outline" className="w-full justify-between"><Link href="/admin/leads">Manage Leads <ArrowRight className="w-4 h-4" /></Link></Button>
        </div></Card>
        <Card className="glass p-6"><div className="flex items-center justify-between mb-4"><h2 className="font-bold">Recent Leads</h2><Link href="/admin/leads" className="text-xs text-blue-400">View all</Link></div>
          {stats?.recentLeads?.length > 0 ? (<div className="space-y-3">{stats.recentLeads.map((l: any) => (<div key={l._id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"><div className="min-w-0"><p className="text-sm font-medium truncate">{l.name}</p><p className="text-xs text-muted-foreground truncate">{l.email}</p></div><div className="flex items-center gap-2 flex-shrink-0"><Badge variant={l.status === 'new' ? 'success' : 'outline'} className="text-[10px]">{l.status}</Badge><span className="text-xs text-muted-foreground">{formatDate(l.createdAt)}</span></div></div>))}</div>) : (<p className="text-sm text-muted-foreground text-center py-8">No leads yet.</p>)}
        </Card>
      </div>
    </div>
  );
}