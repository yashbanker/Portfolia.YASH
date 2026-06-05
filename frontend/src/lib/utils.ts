import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }

export const formatDate = (date: string | Date) =>
  new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

export const SITE = {
  name: 'Yashkumar Zalavadiya',
  title: 'AI Full-Stack Developer | Web Apps, SaaS & Automation',
  description: 'Senior AI full-stack developer building modern web apps, SaaS platforms, AI chatbots, and business automation. Hire me for startups, agencies, and businesses worldwide.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+919999999999',
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@yashkumar.dev',
  github: process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/yashkumar',
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://linkedin.com/in/yashkumar',
  twitter: process.env.NEXT_PUBLIC_TWITTER_URL || 'https://twitter.com/yashkumar',
};

export const whatsappLink = (msg = 'Hi Yashkumar, I would like to discuss a project.') =>
  `https://wa.me/${SITE.whatsapp.replace(/[^\u0030-\u0039]/g, '')}?text=${encodeURIComponent(msg)}`;