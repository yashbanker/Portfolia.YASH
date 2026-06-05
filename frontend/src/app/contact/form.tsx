'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';

const PROJECT_TYPES = ['Website', 'SaaS Platform', 'AI Integration', 'Ecommerce', 'Dashboard / CRM', 'Automation', 'Other'];
const BUDGETS = ['< $1,000', '$1,000 — $5,000', '$5,000 — $15,000', '$15,000+'];

export function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', budget: '', projectType: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setStatus('loading'); setErrorMsg('');
    try { await api.post('/leads', form); setStatus('success'); setForm({ name: '', email: '', phone: '', company: '', budget: '', projectType: '', message: '' }); }
    catch (err: any) { setStatus('error'); setErrorMsg(err.message || 'Something went wrong.'); }
  };
  if (status === 'success') return (<motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12"><div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/20 flex items-center justify-center"><CheckCircle2 className="w-8 h-8 text-emerald-400" /></div><h3 className="text-2xl font-bold mb-2">Message sent! 🎉</h3><p className="text-muted-foreground mb-6">Thanks for reaching out. I'll respond within 24 hours.</p><Button onClick={() => setStatus('idle')} variant="outline">Send another</Button></motion.div>);
  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h2 className="text-2xl font-bold mb-1">Start a project</h2>
      <p className="text-sm text-muted-foreground mb-6">All fields marked * are required.</p>
      <div className="grid md:grid-cols-2 gap-4">
        <div><label className="text-sm font-medium mb-1.5 block">Full Name *</label><Input name="name" required value={form.name} onChange={handleChange} placeholder="Jane Doe" /></div>
        <div><label className="text-sm font-medium mb-1.5 block">Email *</label><Input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="jane@company.com" /></div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div><label className="text-sm font-medium mb-1.5 block">Phone</label><Input name="phone" value={form.phone} onChange={handleChange} placeholder="+1 555 000 0000" /></div>
        <div><label className="text-sm font-medium mb-1.5 block">Company</label><Input name="company" value={form.company} onChange={handleChange} placeholder="Acme Inc." /></div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div><label className="text-sm font-medium mb-1.5 block">Project Type</label><select name="projectType" value={form.projectType} onChange={handleChange} className="flex h-11 w-full rounded-lg border border-border bg-background/50 px-4 py-2 text-sm"><option value="">Select…</option>{PROJECT_TYPES.map((p) => <option key={p} value={p}>{p}</option>)}</select></div>
        <div><label className="text-sm font-medium mb-1.5 block">Budget</label><select name="budget" value={form.budget} onChange={handleChange} className="flex h-11 w-full rounded-lg border border-border bg-background/50 px-4 py-2 text-sm"><option value="">Select…</option>{BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}</select></div>
      </div>
      <div><label className="text-sm font-medium mb-1.5 block">Tell me about your project *</label><Textarea name="message" required rows={6} value={form.message} onChange={handleChange} placeholder="What are you building? Goals, timeline, anything I should know…" /></div>
      {status === 'error' && (<div className="flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-sm text-red-400"><AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" /><span>{errorMsg}</span></div>)}
      <Button type="submit" size="lg" className="w-full" disabled={status === 'loading'}>{status === 'loading' ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</> : <>Send Message <Send className="w-4 h-4" /></>}</Button>
    </form>
  );
}