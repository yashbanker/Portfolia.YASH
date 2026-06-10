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
      { title: 'MotionFlow SaaS', slug: 'motionflow-saas', category: 'SaaS', description: 'One platform for motion designers, video editors, freelancers, and creative agencies.', longDescription: 'MotionFlow is a complete platform designed for creative professionals to manage projects, collaborate with clients, and streamline their workflow.', challenges: 'Building a responsive and intuitive interface for creative professionals.', solution: 'Developed using modern web technologies to ensure a seamless user experience.', results: 'Improved workflow efficiency for creative teams.', thumbnail: '/projects/motionflowsaas.png', technologies: ['React', 'Next.js', 'Tailwind CSS'], liveUrl: 'https://motionflowsaas.netlify.app/', githubUrl: '#', featured: true, order: 1 },
      { title: 'Orderji', slug: 'orderji', category: 'Ecommerce', description: 'A seamless ordering and delivery platform.', longDescription: 'Orderji provides a comprehensive solution for managing orders, tracking deliveries, and improving customer satisfaction.', challenges: 'Handling high traffic and ensuring real-time order updates.', solution: 'Implemented a scalable backend architecture with real-time WebSocket communication.', results: 'Increased order processing speed and customer satisfaction.', thumbnail: '/projects/orderji.png', technologies: ['React', 'Node.js', 'MongoDB'], liveUrl: 'https://orderji.lovable.app', githubUrl: '#', featured: true, order: 2 },
      { title: 'Mobile Shopstock', slug: 'mobile-shopstock', category: 'Ecommerce', description: 'Inventory and e-commerce management for mobile phone retailers.', longDescription: 'Mobile Shopstock is an integrated platform for managing stock, processing sales, and handling customer interactions for mobile phone shops.', challenges: 'Integrating with various payment gateways and inventory systems.', solution: 'Created a unified API layer to handle multiple integrations.', results: 'Streamlined inventory management and increased sales.', thumbnail: '/projects/mobileshopstock.png', technologies: ['React', 'Express', 'Tailwind CSS'], liveUrl: 'https://mobile-shopstock.netlify.app/', githubUrl: '#', featured: true, order: 3 },
      { title: 'Winner Enterprise Demo', slug: 'winner-enterprise-demo', category: 'Dashboard', description: 'Enterprise-grade demonstration platform for business solutions.', longDescription: 'Winner Enterprise Demo showcases powerful enterprise features including analytics, user management, and reporting dashboards.', challenges: 'Presenting complex data in an easy-to-understand format.', solution: 'Used advanced charting libraries and a clean UI design.', results: 'Successfully demonstrated enterprise capabilities to potential clients.', thumbnail: '/projects/winnerenterprise.png', technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'], liveUrl: 'https://winner-enterprisedemo.vercel.app/', githubUrl: '#', featured: true, order: 4 }
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