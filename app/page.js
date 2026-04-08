import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AnalyticsTracker from '@/components/AnalyticsTracker';
import HomeClient from './HomeClient';

export default async function HomePage() {
  let services = [], projects = [], testimonials = [], settings = null;

  try {
    [services, projects, testimonials, settings] = await Promise.all([
      prisma.service.findMany({ where: { published: true }, orderBy: { sortOrder: 'asc' } }),
      prisma.project.findMany({ where: { published: true }, orderBy: { sortOrder: 'asc' } }),
      prisma.testimonial.findMany({ where: { published: true }, orderBy: { sortOrder: 'asc' } }),
      prisma.siteSettings.findUnique({ where: { id: 'main' } }),
    ]);
  } catch (e) {
    // Database not connected, use defaults
    services = [
      { id: '1', title: 'Fintech Solutions', slug: 'fintech', icon: 'CreditCard', description: 'Payment gateways, mobile banking, and blockchain infrastructure.', features: [], sortOrder: 1 },
      { id: '2', title: 'AI Agents & Chatbots', slug: 'ai', icon: 'Bot', description: 'Conversational AI, RAG pipelines, and intelligent automation.', features: [], sortOrder: 2 },
      { id: '3', title: 'ERP Systems', slug: 'erp', icon: 'Settings', description: 'Inventory, procurement, HR, finance — unified in one platform.', features: [], sortOrder: 3 },
      { id: '4', title: 'Mobile Development', slug: 'mobile', icon: 'Smartphone', description: 'Native and cross-platform apps with offline-first architecture.', features: [], sortOrder: 4 },
      { id: '5', title: 'Web Development', slug: 'web', icon: 'Globe', description: 'Progressive web apps and enterprise portals.', features: [], sortOrder: 5 },
      { id: '6', title: 'CRM Platforms', slug: 'crm', icon: 'Users', description: 'AI-driven customer management with 360° views.', features: [], sortOrder: 6 },
    ];
    projects = [
      { id: '1', title: 'AquaFlow', slug: 'aquaflow', category: 'Management System', description: 'Smart water management with IoT integration.', image: 'https://images.unsplash.com/photo-1504309092620-4d0ec726efa4?w=800&h=500&fit=crop', demoUrl: '#', techStack: ['React', 'Node.js', 'PostgreSQL'], featured: true },
      { id: '2', title: 'Gorayo Wholesalers', slug: 'gorayo', category: 'ERP / E-Commerce', description: 'Full-stack wholesale distribution platform.', image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=800&h=500&fit=crop', demoUrl: '#', techStack: ['Next.js', 'Python'], featured: true },
      { id: '3', title: 'eTIMS VAT System', slug: 'etims', category: 'Fintech / Compliance', description: 'KRA-compliant electronic tax invoice management.', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=500&fit=crop', demoUrl: '#', techStack: ['React', 'Node.js'], featured: true },
    ];
    testimonials = [
      { id: '1', name: 'James Mwangi', role: 'CFO', company: 'AquaFlow Utilities', text: 'Revenue collection improved 40% in three months.', rating: 5 },
      { id: '2', name: 'Amina Hassan', role: 'CEO', company: 'Gorayo Wholesalers', text: 'We now manage 12 warehouses from a single dashboard.', rating: 5 },
      { id: '3', name: 'Peter Ochieng', role: 'Compliance Lead', company: 'KenyaTax', text: 'Manual filing to fully automated VAT in two weeks.', rating: 5 },
    ];
  }

  return (
    <>
      <AnalyticsTracker />
      <Navbar />
      <HomeClient services={services} projects={projects} testimonials={testimonials} settings={settings} />
      <Footer />
    </>
  );
}
