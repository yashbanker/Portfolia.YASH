import type { Metadata } from 'next';
import Link from 'next/link';
import * as Icons from 'lucide-react';
import { ArrowRight, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockServices } from '@/lib/mock-data';
import { api } from '@/lib/api';
import { CTASection } from '@/components/sections/cta-section';

export const metadata: Metadata = { title: 'Services', description: 'Premium web development, SaaS, AI integration, and business automation services.' };
export const dynamic = 'force-dynamic';

async function getServices() { try { const res = await api.get('/services'); return res.data?.length ? res.data : mockServices; } catch { return mockServices; } }

export default async function ServicesPage() {
  const services = await getServices();
  return (
    <>
      <section className="section-padding">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4">Services</Badge>
            <h1 className="heading-1 mb-6">Premium development <br /><span className="gradient-text">services</span></h1>
            <p className="text-muted-foreground text-lg">Whatever you're building — a marketing site, a SaaS platform, an AI feature, or a custom automation — I deliver production-ready code with agency-level craft.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s: any) => {
              const Icon = (Icons as any)[s.icon] || Icons.Code2;
              return (
                <article key={s._id} className="group glass rounded-2xl p-8 hover:border-blue-500/40 transition-all hover:-translate-y-1 flex flex-col">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform"><Icon className="w-7 h-7 text-blue-400" /></div>
                  <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                  <p className="text-sm text-muted-foreground mb-5">{s.description}</p>
                  {s.benefits?.length > 0 && (
                    <ul className="space-y-2 mb-6 flex-1">{s.benefits.map((b: string, idx: number) => (<li key={idx} className="flex items-start gap-2 text-sm"><Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" /><span className="text-muted-foreground">{b}</span></li>))}</ul>
                  )}
                  <Button asChild variant="outline" className="w-full mt-auto"><Link href="/contact">Get Started <ArrowRight className="w-4 h-4" /></Link></Button>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}