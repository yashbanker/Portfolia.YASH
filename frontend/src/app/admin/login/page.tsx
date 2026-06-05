'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Sparkles, Loader2, AlertCircle, Lock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { api, tokenStore } from '@/lib/api';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError('');
    try { const res = await api.post('/auth/login', { email, password }); tokenStore.set(res.token); router.push('/admin'); }
    catch (err: any) { setError(err.message || 'Login failed'); setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 hero-gradient">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/40"><Sparkles className="w-7 h-7 text-white" /></div>
          <h1 className="text-3xl font-bold mb-1">Admin Login</h1>
          <p className="text-sm text-muted-foreground">Sign in to manage your portfolio</p>
        </div>
        <Card className="glass p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div><label className="text-sm font-medium mb-1.5 block">Email</label><Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@yashkumar.dev" /></div>
            <div><label className="text-sm font-medium mb-1.5 block">Password</label><Input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" /></div>
            {error && (<div className="flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-sm text-red-400"><AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" /><span>{error}</span></div>)}
            <Button type="submit" size="lg" className="w-full" disabled={loading}>{loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Signing in…</> : <><Lock className="w-4 h-4" /> Sign In</>}</Button>
          </form>
        </Card>
        <p className="text-center text-xs text-muted-foreground mt-6">Use the credentials from your <code className="text-blue-400">.env</code> seed setup.</p>
      </motion.div>
    </div>
  );
}