import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AnalyticsTracker from '@/components/AnalyticsTracker';
import ServicesClient from './ServicesClient';
import { prisma } from '@/lib/prisma';

export const metadata = { title: 'Services — Novokraft Limited' };

export default async function ServicesPage() {
  let services = [];
  try {
    services = await prisma.service.findMany({ where: { published: true }, orderBy: { sortOrder: 'asc' } });
  } catch {
    services = [
      { id: '1', title: 'Fintech Solutions', slug: 'fintech', icon: 'CreditCard', description: 'Payment gateways, mobile banking, lending platforms, and blockchain-powered financial infrastructure.', features: ['Payment Processing', 'Mobile Banking', 'Lending Platforms', 'Blockchain'] },
      { id: '2', title: 'Management Information Systems', slug: 'mis', icon: 'BarChart3', description: 'Real-time dashboards, analytics engines, and decision-support systems.', features: ['Dashboards', 'Analytics', 'Decision Support', 'Reports'] },
      { id: '3', title: 'Mobile Development', slug: 'mobile', icon: 'Smartphone', description: 'Native iOS/Android and cross-platform apps with fluid animations.', features: ['iOS & Android', 'Flutter', 'Offline-First', 'Push Notifications'] },
      { id: '4', title: 'Web Development', slug: 'web', icon: 'Globe', description: 'Progressive web apps, e-commerce platforms, and enterprise portals.', features: ['PWA', 'E-Commerce', 'Enterprise Portals', 'SEO'] },
      { id: '5', title: 'ERP Systems', slug: 'erp', icon: 'Settings', description: 'End-to-end enterprise resource planning — inventory, procurement, HR, finance.', features: ['Inventory', 'Procurement', 'HR & Payroll', 'Finance'] },
      { id: '6', title: 'CRM Platforms', slug: 'crm', icon: 'Users', description: 'AI-driven customer relationship management with automated workflows.', features: ['Lead Scoring', 'Sales Pipeline', 'Marketing Automation', 'Analytics'] },
      { id: '7', title: 'AI Agents & Chatbots', slug: 'ai', icon: 'Bot', description: 'Conversational AI, autonomous agents, RAG pipelines, and intelligent automation.', features: ['Conversational AI', 'RAG Pipelines', 'NLP', 'Automation'] },
      { id: '8', title: 'Custom Software', slug: 'custom', icon: 'Puzzle', description: 'Bespoke solutions — API integrations, microservices, cloud migration.', features: ['APIs', 'Microservices', 'Cloud', 'DevOps'] },
    ];
  }
  return (
    <>
      <AnalyticsTracker />
      <Navbar />
      <ServicesClient services={services} />
      <Footer />
    </>
  );
}
