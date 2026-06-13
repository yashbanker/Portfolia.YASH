"use client";

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { mockSkills } from '@/lib/mock-data';

export default function SkillsSection() {
  return (
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
  );
}
