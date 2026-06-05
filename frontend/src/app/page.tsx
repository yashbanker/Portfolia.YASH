import { Hero } from '@/components/sections/hero';
import { Stats } from '@/components/sections/stats';
import { FeaturedProjects } from '@/components/sections/featured-projects';
import { ServicesPreview } from '@/components/sections/services-preview';
import { TestimonialsSection } from '@/components/sections/testimonials-section';
import { CTASection } from '@/components/sections/cta-section';
import { api } from '@/lib/api';
import { mockProjects, mockServices, mockTestimonials } from '@/lib/mock-data';

export const dynamic = 'force-dynamic';

async function getData() {
  try {
    const [projects, services, testimonials] = await Promise.all([
      api.get('/projects?featured=true&limit=4').catch(() => ({ data: null })),
      api.get('/services').catch(() => ({ data: null })),
      api.get('/testimonials').catch(() => ({ data: null })),
    ]);
    return { projects: projects.data, services: services.data, testimonials: testimonials.data };
  } catch { return { projects: null, services: null, testimonials: null }; }
}

export default async function HomePage() {
  const { projects, services, testimonials } = await getData();
  return (
    <>
      <Hero />
      <Stats />
      <FeaturedProjects projects={projects || mockProjects} />
      <ServicesPreview services={services || mockServices} />
      <TestimonialsSection items={testimonials || mockTestimonials} />
      <CTASection />
    </>
  );
}