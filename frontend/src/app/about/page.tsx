import type { Metadata } from 'next';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { GraduationCap, Code2, Rocket, Target, Award, Briefcase } from 'lucide-react';
import { mockSkills } from '@/lib/mock-data';

export const metadata: Metadata = { title: 'About', description: 'Senior AI Full-Stack Developer with 5+ years of experience building modern web apps, SaaS platforms, and AI automation.' };

const timeline = [
  { year: '2020', title: 'Started Web Development Journey', description: 'Began learning HTML, CSS, JavaScript and built first portfolio projects.', icon: GraduationCap },
  { year: '2021', title: 'Full Stack Mastery', description: 'Mastered MERN stack and shipped 10+ client projects as a freelance developer.', icon: Code2 },
  { year: '2022', title: 'SaaS & Cloud Architecture', description: 'Specialized in SaaS development, multi-tenant architecture, and cloud deployments.', icon: Rocket },
  { year: '2023', title: 'AI Integration Specialist', description: 'Pivoted to AI engineering — OpenAI, LangChain, RAG, and vector databases.', icon: Award },
  { year: '2024', title: 'Senior Freelance Consultant', description: 'Working with startups and agencies globally on premium AI-powered projects.', icon: Briefcase },
  { year: '2026', title: 'Building Premium Products', description: 'Currently building production-grade AI products and SaaS platforms for clients worldwide.', icon: Target },
];

export default function AboutPage() {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <Badge className="mb-4">About Me</Badge>
            <h1 className="heading-2 mb-6">Crafting digital products that <span className="gradient-text">drive business growth</span></h1>
            <p className="text-muted-foreground leading-relaxed mb-4">Hi, I'm <strong className="text-foreground">Yashkumar Zalavadiya</strong> — a senior AI full-stack developer based in India, working with clients globally. Over the last 5+ years, I've helped startups, agencies, and growing businesses ship products that users love and that move the needle.</p>
            <p className="text-muted-foreground leading-relaxed mb-4">My focus is on building <strong className="text-foreground">production-grade web applications</strong> — from modern marketing sites to complex SaaS platforms with AI integrations. I care deeply about performance, accessibility, code quality, and most importantly — delivering measurable business impact.</p>
            <p className="text-muted-foreground leading-relaxed">When I'm not coding, I'm exploring new AI models, contributing to open source, or writing about web development.</p>
          </div>
          <div className="relative aspect-square rounded-3xl overflow-hidden glass max-w-md mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-indigo-500/20 to-cyan-500/30" />
            <div className="absolute inset-0 bg-grid-pattern bg-[size:30px_30px] opacity-30" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-5xl font-bold mb-4 shadow-2xl shadow-blue-500/50">YZ</div>
                <h3 className="font-bold text-xl">Yashkumar Zalavadiya</h3>
                <p className="text-sm text-muted-foreground">AI Full-Stack Developer</p>
              </div>
            </div>
          </div>
        </div>

        <Card className="glass p-10 mb-20 text-center max-w-4xl mx-auto">
          <Badge className="mb-4">Mission</Badge>
          <h2 className="heading-3 mb-4">"I help businesses turn ideas into <span className="gradient-text">profitable digital products</span> — fast."</h2>
          <p className="text-muted-foreground">I believe great software should be fast, beautiful, secure, and built to scale. My mission is to bring agency-level quality to every client — whether you're a solo founder, a small business, or a venture-backed startup.</p>
        </Card>

        <div className="mb-20">
          <div className="text-center mb-12"><Badge className="mb-4">Skills</Badge><h2 className="heading-2">Technical <span className="gradient-text">Expertise</span></h2></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from(new Set(mockSkills.map((s) => s.category))).map((cat) => (
              <div key={cat} className="glass rounded-2xl p-6">
                <h3 className="font-bold mb-4 text-blue-400">{cat}</h3>
                <div className="space-y-4">
                  {mockSkills.filter((s) => s.category === cat).map((s, i) => (
                    <div key={s.name}>
                      <div className="flex justify-between mb-1.5 text-sm"><span className="font-medium">{s.name}</span><span className="text-muted-foreground">{s.level}%</span></div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} whileInView={{ width: `${s.level}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: i * 0.1 }} className="h-full bg-gradient-to-r from-blue-500 to-cyan-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12"><Badge className="mb-4">Journey</Badge><h2 className="heading-2">My <span className="gradient-text">Timeline</span></h2></div>
          <div className="relative pl-8 md:pl-12">
            <div className="absolute left-3 md:left-5 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-cyan-400 to-transparent" />
            {timeline.map((item, i) => (
              <div key={i} className="relative mb-10 last:mb-0">
                <div className="absolute -left-8 md:-left-12 top-0 w-7 h-7 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <item.icon className="w-3 h-3 md:w-5 md:h-5 text-white" />
                </div>
                <Card className="glass p-6">
                  <Badge variant="outline" className="mb-2">{item.year}</Badge>
                  <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}