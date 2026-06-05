import type { Metadata } from 'next';
import { Mail, MessageCircle, Clock, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { SITE, whatsappLink } from '@/lib/utils';
import { ContactForm } from './form';

export const metadata: Metadata = { title: 'Contact', description: 'Get in touch to discuss your project. Available for freelance web development, SaaS, and AI integration work.' };

export default function ContactPage() {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-4">Contact</Badge>
          <h1 className="heading-1 mb-6">Let's build something <span className="gradient-text">amazing</span></h1>
          <p className="text-muted-foreground text-lg">Have a project in mind? Fill out the form below — I'll get back to you within 24 hours with next steps, ideas, and a clear plan.</p>
        </div>
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="space-y-4">
            <Card className="glass p-6"><div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mb-3"><Mail className="w-6 h-6 text-blue-400" /></div><h3 className="font-bold mb-1">Email</h3><a href={`mailto:${SITE.email}`} className="text-sm text-muted-foreground hover:text-blue-400 break-all">{SITE.email}</a></Card>
            <Card className="glass p-6"><div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center mb-3"><MessageCircle className="w-6 h-6 text-green-400" /></div><h3 className="font-bold mb-1">WhatsApp</h3><a href={whatsappLink()} target="_blank" rel="noopener" className="text-sm text-muted-foreground hover:text-green-400">Chat instantly</a></Card>
            <Card className="glass p-6"><div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center mb-3"><Clock className="w-6 h-6 text-indigo-400" /></div><h3 className="font-bold mb-1">Response Time</h3><p className="text-sm text-muted-foreground">Within 24 hours</p></Card>
            <Card className="glass p-6"><div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500/20 to-pink-500/20 flex items-center justify-center mb-3"><MapPin className="w-6 h-6 text-rose-400" /></div><h3 className="font-bold mb-1">Location</h3><p className="text-sm text-muted-foreground">India · Working globally</p></Card>
          </div>
          <div className="lg:col-span-2"><Card className="glass p-8"><ContactForm /></Card></div>
        </div>
      </div>
    </section>
  );
}