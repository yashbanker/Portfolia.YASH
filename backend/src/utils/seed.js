require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Project = require('../models/Project');
const Service = require('../models/Service');
const Testimonial = require('../models/Testimonial');
const Skill = require('../models/Skill');

const seed = async () => {
  try {
    if (!process.env.MONGODB_URI) { console.log('Set MONGODB_URI first'); process.exit(1); }
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await User.deleteMany({});
    await User.create({ name: 'Yashkumar Zalavadiya', email: process.env.ADMIN_EMAIL || 'admin@yashkumar.dev', password: process.env.ADMIN_PASSWORD || 'ChangeMe@2026!', role: 'admin' });
    console.log('Admin user created');

    await Project.deleteMany({});
    await Project.insertMany([
      { title: 'NeuralFlow AI — Customer Support Chatbot Platform', slug: 'neuralflow-ai-chatbot-platform', category: 'AI', description: 'Multi-tenant AI chatbot SaaS with custom training, OpenAI GPT-4 integration, and analytics dashboard.', longDescription: 'A complete AI-powered customer support platform that allows businesses to deploy intelligent chatbots trained on their own knowledge base.', challenges: 'Achieving sub-second response times while running RAG queries on large knowledge bases. Implementing accurate context retention across long conversations.', solution: 'Implemented vector search with Pinecone, response streaming with server-sent events, and Redis caching. Used LangChain for conversation memory.', results: 'Reduced average customer support response time by 78%. Currently serving 40+ businesses with 99.8% uptime.', thumbnail: '/projects/neuralflow.svg', technologies: ['Next.js', 'OpenAI', 'LangChain', 'Pinecone', 'MongoDB'], liveUrl: '#', githubUrl: '#', featured: true, order: 1 },
      { title: 'CommerceForge — Headless E-commerce Platform', slug: 'commerceforge-headless-ecommerce', category: 'Ecommerce', description: 'Modern headless ecommerce with Stripe payments, inventory management, and admin dashboard for a fashion brand.', longDescription: 'A complete custom e-commerce solution built from scratch for a growing fashion brand. Replaced their Shopify setup with a fully owned, faster, and more flexible platform.', challenges: 'Migrating thousands of products and order history without downtime. Complex product variants with multiple sizes, colors, and pricing tiers.', solution: 'Built a phased migration script with rollback capability. Designed a flexible variant matrix schema. Implemented one-page checkout with Stripe Elements.', results: 'Page load times dropped from 4.2s to 0.9s. Cart abandonment reduced by 34%. Conversion rate increased by 22%.', thumbnail: '/projects/commerceforge.svg', technologies: ['Next.js 15', 'TypeScript', 'Stripe', 'MongoDB', 'Tailwind CSS'], liveUrl: '#', githubUrl: '#', featured: true, order: 2 },
      { title: 'PulseBoard — Real-time Analytics Dashboard', slug: 'pulseboard-analytics-dashboard', category: 'Dashboard', description: 'Real-time business analytics dashboard with custom widgets and WebSocket live data for a B2B SaaS company.', longDescription: 'A flexible analytics platform that pulls data from Stripe, Google Analytics, HubSpot, and custom APIs.', challenges: 'Aggregating data from 8+ third-party APIs with different rate limits and schemas. Real-time updates without overwhelming the client.', solution: 'Created a unified ETL pipeline with BullMQ job queues. Used Socket.io with smart batching for live updates.', results: 'Saved client team ~15 hours per week of manual reporting. Enabled real-time alerts that helped catch 3 major incidents.', thumbnail: '/projects/pulseboard.svg', technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'BullMQ'], liveUrl: '#', githubUrl: '#', featured: true, order: 3 },
      { title: 'TaskSphere — Team Collaboration SaaS', slug: 'tasksphere-collaboration-saas', category: 'SaaS', description: 'Project management SaaS with kanban boards, time tracking, team chat, and Stripe subscription billing.', longDescription: 'A full-featured project management platform competing with Asana and ClickUp for small-to-medium teams.', challenges: 'Building a responsive drag-and-drop kanban that works on touch devices. Real-time collaboration without conflicts.', solution: 'Used dnd-kit for accessible drag-and-drop. Implemented operational transforms for conflict-free collaborative editing.', results: 'Onboarded 120+ teams in first 6 months. Achieved $8K MRR within first quarter. 92% user retention after 60 days.', thumbnail: '/projects/tasksphere.svg', technologies: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Stripe'], liveUrl: '#', githubUrl: '#', featured: true, order: 4 },
      { title: 'LeadMagnet AI — Automated Outreach Tool', slug: 'leadmagnet-ai-outreach', category: 'AI', description: 'AI-powered lead generation tool that scrapes, enriches, and personalizes cold outreach at scale.', longDescription: 'A growth-hacking tool for sales teams that automates the entire cold outreach workflow.', challenges: 'Avoiding rate limits and detection on scraping sources. Generating personalization that does not feel robotic.', solution: 'Built a distributed scraping system with proxy rotation. Trained a custom prompt with 200+ example outputs.', results: 'Increased reply rates by 4.3x compared to template-based outreach. Saved sales teams ~20 hours per week.', thumbnail: '/projects/leadmagnet.svg', technologies: ['Node.js', 'OpenAI', 'Puppeteer', 'MongoDB', 'BullMQ'], liveUrl: '#', githubUrl: '#', featured: false, order: 5 },
      { title: 'Aurora Studio — Premium Agency Website', slug: 'aurora-studio-agency-website', category: 'Web Apps', description: 'High-converting agency website with CMS, blog, case studies, and animated interactions for a design studio.', longDescription: 'A premium website for a design studio targeting enterprise clients.', challenges: 'Achieving butter-smooth animations without hurting performance. Building a CMS flexible enough for non-technical editors.', solution: 'Used Framer Motion with layout animations and View Transitions API. Built a custom CMS on top of Sanity with previews.', results: 'Lighthouse score of 98. Organic traffic grew 240% within 4 months. Generated 30+ qualified enterprise leads.', thumbnail: '/projects/aurora.svg', technologies: ['Next.js 15', 'Sanity CMS', 'Framer Motion', 'Tailwind CSS'], liveUrl: '#', githubUrl: '#', featured: false, order: 6 },
    ]);
    console.log('6 projects seeded');

    await Service.deleteMany({});
    await Service.insertMany([
      { title: 'Web Development', slug: 'web-development', icon: 'Code2', description: 'Modern, responsive websites built with Next.js, React, and TypeScript. Focused on speed, SEO, and conversion.', benefits: ['Lightning-fast load times', 'SEO-ready architecture', 'Mobile-first design', 'Custom animations'], category: 'Development', order: 1 },
      { title: 'Full Stack Development', slug: 'full-stack-development', icon: 'Layers', description: 'End-to-end web applications with secure APIs, databases, authentication, and admin panels.', benefits: ['Complete frontend + backend', 'Scalable cloud architecture', 'Secure authentication', 'CI/CD deployment'], category: 'Development', order: 2 },
      { title: 'SaaS Platform Development', slug: 'saas-platforms', icon: 'Cloud', description: 'Multi-tenant SaaS products with subscription billing, team workspaces, and admin dashboards.', benefits: ['Stripe subscription billing', 'Multi-tenant architecture', 'Team workspaces & RBAC', 'Analytics built in'], category: 'Development', order: 3 },
      { title: 'AI Integrations & Chatbots', slug: 'ai-integrations', icon: 'Bot', description: 'Custom AI features powered by OpenAI, LangChain, and vector databases. Chatbots and AI automations.', benefits: ['GPT-4 / Claude integration', 'RAG with vector search', 'Multi-turn conversation memory', 'Smart automations'], category: 'AI', order: 4 },
      { title: 'Business Automation', slug: 'business-automation', icon: 'Workflow', description: 'Automate repetitive tasks and integrate your tools to save hours every week.', benefits: ['Zapier / n8n workflows', 'Custom API integrations', 'Email automation', 'Reporting automation'], category: 'AI', order: 5 },
      { title: 'Admin Dashboards & CRMs', slug: 'dashboards-crm', icon: 'LayoutDashboard', description: 'Powerful internal tools, dashboards, and CRMs tailored to your business. Stop using spreadsheets.', benefits: ['Custom data models', 'Role-based access', 'Real-time analytics', 'Export tools'], category: 'Development', order: 6 },
      { title: 'Ecommerce Development', slug: 'ecommerce', icon: 'ShoppingBag', description: 'Custom online stores with secure checkout, inventory management, and conversion-optimized design.', benefits: ['Stripe / Razorpay', 'Inventory management', 'Mobile-first shopping', 'SEO-ready'], category: 'Development', order: 7 },
      { title: 'API Development', slug: 'api-development', icon: 'Server', description: 'RESTful and GraphQL APIs with proper documentation, authentication, and rate limiting.', benefits: ['REST & GraphQL', 'JWT / OAuth', 'OpenAPI docs', 'Rate limiting'], category: 'Development', order: 8 },
    ]);
    console.log('8 services seeded');

    await Testimonial.deleteMany({});
    await Testimonial.insertMany([
      { name: 'Priya Sharma', role: 'Founder & CEO', company: 'Bloom Wellness', feedback: 'Yashkumar transformed our outdated website into a modern, lead-generating machine. Bookings increased by 60% in the first month. His attention to detail and communication is exceptional.', rating: 5, featured: true },
      { name: 'Marcus Chen', role: 'CTO', company: 'StackPilot', feedback: 'We hired Yash to build our SaaS MVP and he delivered ahead of schedule. The code quality is production-grade, the UI is beautiful, and the admin panel saves our ops team hours every week.', rating: 5, featured: true },
      { name: 'Elena Rodriguez', role: 'Marketing Director', company: 'Forge Digital Agency', feedback: 'Best developer we have worked with. Built three client sites for us, all delivered on time with pixel-perfect designs. AI chatbot integration was a game-changer.', rating: 5, featured: true },
      { name: 'Rohan Mehta', role: 'Operations Head', company: 'Skyline Logistics', feedback: 'The custom dashboard Yash built replaced 4 different spreadsheets and saves us about 20 hours of manual work every week. ROI achieved in under 2 months.', rating: 5, featured: false },
      { name: 'Sarah Johnson', role: 'Founder', company: 'Lumen Education', feedback: 'Yashkumar built our entire e-learning platform from scratch. The user experience is fantastic and our students love it. Highly recommend for any complex web project.', rating: 5, featured: false },
      { name: 'David Park', role: 'CEO', company: 'NorthLoop SaaS', feedback: 'Professional, fast, and an excellent communicator. Yash integrated OpenAI into our existing platform and the results have been outstanding.', rating: 5, featured: false },
    ]);
    console.log('6 testimonials seeded');

    await Skill.deleteMany({});
    await Skill.insertMany([
      { name: 'Next.js', category: 'Frontend', level: 95, order: 1 }, { name: 'React', category: 'Frontend', level: 96, order: 2 },
      { name: 'TypeScript', category: 'Frontend', level: 92, order: 3 }, { name: 'Tailwind CSS', category: 'Frontend', level: 95, order: 4 },
      { name: 'Framer Motion', category: 'Frontend', level: 88, order: 5 }, { name: 'Node.js', category: 'Backend', level: 94, order: 6 },
      { name: 'Express.js', category: 'Backend', level: 92, order: 7 }, { name: 'MongoDB', category: 'Database', level: 90, order: 8 },
      { name: 'PostgreSQL', category: 'Database', level: 85, order: 9 }, { name: 'OpenAI / LangChain', category: 'AI', level: 90, order: 10 },
      { name: 'Docker', category: 'DevOps', level: 82, order: 11 }, { name: 'Vercel / Render', category: 'DevOps', level: 90, order: 12 },
      { name: 'Git / GitHub', category: 'Tools', level: 94, order: 13 }, { name: 'REST APIs', category: 'Tools', level: 92, order: 14 },
    ]);
    console.log('14 skills seeded');

    console.log('\n✓ Database seeded successfully!');
    console.log(`  Admin: ${process.env.ADMIN_EMAIL || 'admin@yashkumar.dev'}`);
    console.log(`  Pass:  ${process.env.ADMIN_PASSWORD || 'ChangeMe@2026!'}`);
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
};

seed();