import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AnalyticsTracker from '@/components/AnalyticsTracker';
import ProjectsClient from './ProjectsClient';
import { prisma } from '@/lib/prisma';

export const metadata = { title: 'Projects — Novokraft Limited' };

export default async function ProjectsPage() {
  let projects = [];
  try {
    projects = await prisma.project.findMany({ where: { published: true }, orderBy: { sortOrder: 'asc' } });
  } catch {
    projects = [
      { id: '1', title: 'AquaFlow', slug: 'aquaflow', category: 'Management System', description: 'Smart water management and billing system with IoT sensor integration, real-time consumption tracking, and automated invoicing.', longDesc: 'A comprehensive water utility management platform serving thousands of households.', image: 'https://images.unsplash.com/photo-1504309092620-4d0ec726efa4?w=800&h=500&fit=crop', demoUrl: '#', videoUrl: '', techStack: ['React', 'Node.js', 'PostgreSQL', 'IoT'], featured: true },
      { id: '2', title: 'Gorayo Wholesalers', slug: 'gorayo', category: 'ERP / E-Commerce', description: 'Full-stack wholesale distribution platform with inventory management, order processing, and real-time stock visibility.', image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=800&h=500&fit=crop', demoUrl: '#', videoUrl: '', techStack: ['Next.js', 'Python', 'PostgreSQL', 'Redis'], featured: true },
      { id: '3', title: 'eTIMS VAT System', slug: 'etims', category: 'Fintech / Compliance', description: 'KRA-compliant electronic tax invoice management system with automated VAT calculations and real-time reporting.', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=500&fit=crop', demoUrl: '#', videoUrl: '', techStack: ['React', 'Node.js', 'PostgreSQL', 'KRA API'], featured: true },
    ];
  }
  return (
    <>
      <AnalyticsTracker />
      <Navbar />
      <ProjectsClient projects={projects} />
      <Footer />
    </>
  );
}
