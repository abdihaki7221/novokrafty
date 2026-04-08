import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // ─── Admin User ───
  const hashedPassword = await bcrypt.hash('Mehmed1453-@', 12);
  await prisma.admin.upsert({
    where: { email: 'novokraftAdmin1453@gmail.com' },
    update: { password: hashedPassword, name: 'Novokraft Admin' },
    create: {
      email: 'novokraftAdmin1453@gmail.com',
      password: hashedPassword,
      name: 'Novokraft Admin',
    },
  });

  // ─── Site Settings ───
  await prisma.siteSettings.upsert({
    where: { id: 'main' },
    update: {},
    create: {
      id: 'main',
      companyName: 'Novokraft Limited',
      tagline: 'Engineering the Future of Software',
      email: 'info@novokraft.co.ke',
      phone: '+254 707 332 229',
      address: 'Westlands, Nairobi, Kenya',
      mission: 'We engineer the digital backbone of tomorrow\'s enterprises. Born from a passion for elegant code and transformative technology, we partner with businesses across East Africa and beyond to turn complex challenges into seamless software experiences.',
      vision: 'To become Africa\'s most trusted technology partner — known for craftsmanship, innovation, and solutions that genuinely move the needle.',
      values: ['Engineering Excellence', 'Client-First Thinking', 'Relentless Innovation', 'Radical Transparency'],
      linkedin: 'https://linkedin.com/company/novokraft',
      twitter: 'https://twitter.com/novokraft',
      github: 'https://github.com/novokraft',
      youtube: 'https://youtube.com/@novokraft',
    },
  });

  // ─── Services ───
  const services = [
    { title: 'Fintech Solutions', slug: 'fintech', icon: 'CreditCard', description: 'Payment gateways, mobile banking, lending platforms, and blockchain-powered financial infrastructure built for scale and compliance.', features: ['Payment Processing', 'Mobile Banking', 'Lending Platforms', 'Blockchain Integration'], sortOrder: 1 },
    { title: 'Management Information Systems', slug: 'mis', icon: 'BarChart3', description: 'Real-time dashboards, analytics engines, and decision-support systems that transform raw data into strategic insight.', features: ['Real-time Dashboards', 'Data Analytics', 'Decision Support', 'Report Generation'], sortOrder: 2 },
    { title: 'Mobile Development', slug: 'mobile', icon: 'Smartphone', description: 'Native iOS/Android and cross-platform apps with fluid animations, offline-first architecture, and seamless UX.', features: ['iOS & Android', 'Cross-Platform (Flutter)', 'Offline-First', 'Push Notifications'], sortOrder: 3 },
    { title: 'Web Development', slug: 'web', icon: 'Globe', description: 'Progressive web apps, e-commerce platforms, and enterprise portals engineered for performance and accessibility.', features: ['Progressive Web Apps', 'E-Commerce', 'Enterprise Portals', 'SEO Optimization'], sortOrder: 4 },
    { title: 'ERP Systems', slug: 'erp', icon: 'Settings', description: 'End-to-end enterprise resource planning — inventory, procurement, HR, finance — unified in one intelligent platform.', features: ['Inventory Management', 'Procurement', 'HR & Payroll', 'Financial Reporting'], sortOrder: 5 },
    { title: 'CRM Platforms', slug: 'crm', icon: 'Users', description: 'Customer relationship management with AI-driven lead scoring, automated workflows, and 360° customer views.', features: ['Lead Management', 'Sales Pipeline', 'Marketing Automation', 'Customer Analytics'], sortOrder: 6 },
    { title: 'AI Agents & Chatbots', slug: 'ai-agents', icon: 'Bot', description: 'Conversational AI, autonomous agents, RAG pipelines, and intelligent automation that learn and evolve with your business.', features: ['Conversational AI', 'RAG Pipelines', 'Process Automation', 'NLP & NLU'], sortOrder: 7 },
    { title: 'Custom Software', slug: 'custom', icon: 'Puzzle', description: 'Bespoke solutions architected from the ground up — API integrations, microservices, cloud migration, and beyond.', features: ['API Development', 'Microservices', 'Cloud Migration', 'DevOps & CI/CD'], sortOrder: 8 },
  ];

  for (const s of services) {
    await prisma.service.upsert({ where: { slug: s.slug }, update: s, create: s });
  }

  // ─── Projects ───
  const projects = [
    { title: 'AquaFlow', slug: 'aquaflow', category: 'Management System', description: 'Smart water management and billing system with IoT sensor integration, real-time consumption tracking, and automated invoicing for utility companies.', image: 'https://images.unsplash.com/photo-1504309092620-4d0ec726efa4?w=800&h=500&fit=crop', demoUrl: 'https://aquaflow.novokraft.com', techStack: ['React', 'Node.js', 'PostgreSQL', 'IoT'], featured: true, sortOrder: 1 },
    { title: 'Gorayo Wholesalers', slug: 'gorayo', category: 'ERP / E-Commerce', description: 'Full-stack wholesale distribution platform with inventory management, order processing, route optimization, and real-time stock visibility across warehouses.', image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=800&h=500&fit=crop', demoUrl: 'https://gorayo.novokraft.com', techStack: ['Next.js', 'Python', 'PostgreSQL', 'Redis'], featured: true, sortOrder: 2 },
    { title: 'eTIMS VAT System', slug: 'etims', category: 'Fintech / Compliance', description: 'KRA-compliant electronic tax invoice management system with automated VAT calculations, real-time reporting, and seamless integration with existing accounting software.', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=500&fit=crop', demoUrl: 'https://etims.novokraft.com', techStack: ['React', 'Node.js', 'PostgreSQL', 'KRA API'], featured: true, sortOrder: 3 },
  ];

  for (const p of projects) {
    await prisma.project.upsert({ where: { slug: p.slug }, update: p, create: p });
  }

  // ─── Team Members ───
  const team = [
    { name: 'CEO', role: 'Chief Executive Officer', bio: 'Visionary leader driving Novokraft\'s mission to transform Africa\'s digital landscape.', sortOrder: 1 },
    { name: 'CTO', role: 'Chief Technology Officer', bio: 'Architecting scalable systems and leading our engineering excellence.', sortOrder: 2 },
    { name: 'Head of Design', role: 'Design Lead', bio: 'Crafting intuitive, beautiful experiences that delight users.', sortOrder: 3 },
  ];

  for (const t of team) {
    const existing = await prisma.teamMember.findFirst({ where: { role: t.role } });
    if (!existing) await prisma.teamMember.create({ data: t });
  }

  // ─── Testimonials ───
  const testimonials = [
    { name: 'James Mwangi', role: 'CFO', company: 'AquaFlow Utilities', text: 'Novokraft transformed our billing chaos into a streamlined, real-time system. Revenue collection improved 40% in three months.', rating: 5, sortOrder: 1 },
    { name: 'Amina Hassan', role: 'CEO', company: 'Gorayo Wholesalers', text: 'Their ERP solution gave us visibility we never had. We now manage 12 warehouses from a single dashboard.', rating: 5, sortOrder: 2 },
    { name: 'Peter Ochieng', role: 'Tax Compliance Lead', company: 'KenyaTax Corp', text: 'The eTIMS integration was seamless. We went from manual filing to fully automated VAT compliance in two weeks.', rating: 5, sortOrder: 3 },
  ];

  for (const t of testimonials) {
    const existing = await prisma.testimonial.findFirst({ where: { name: t.name } });
    if (!existing) await prisma.testimonial.create({ data: t });
  }

  // ─── Careers ───
  const careers = [
    { title: 'Senior Full-Stack Engineer', department: 'Engineering', type: 'Full-time', location: 'Nairobi / Remote', description: 'Build and ship production systems using React, Node.js, and PostgreSQL.', requirements: ['3+ years experience', 'React & Node.js', 'PostgreSQL', 'CI/CD pipelines'] },
    { title: 'Mobile Developer (Flutter)', department: 'Engineering', type: 'Full-time', location: 'Nairobi', description: 'Craft beautiful cross-platform mobile experiences for our fintech and enterprise clients.', requirements: ['2+ years Flutter', 'Dart proficiency', 'REST API integration', 'State management'] },
    { title: 'AI/ML Engineer', department: 'AI Lab', type: 'Contract', location: 'Remote', description: 'Design and deploy conversational AI agents, recommendation engines, and NLP pipelines.', requirements: ['Python & TensorFlow/PyTorch', 'NLP experience', 'RAG pipelines', 'Cloud deployment'] },
  ];

  for (const c of careers) {
    const existing = await prisma.career.findFirst({ where: { title: c.title } });
    if (!existing) await prisma.career.create({ data: c });
  }

  console.log('✅ Database seeded successfully!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
