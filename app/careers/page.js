import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AnalyticsTracker from '@/components/AnalyticsTracker';
import CareersClient from './CareersClient';
import { prisma } from '@/lib/prisma';

export const metadata = { title: 'Careers — Novokraft Limited' };

export default async function CareersPage() {
  let careers = [];
  try { careers = await prisma.career.findMany({ where: { published: true }, orderBy: { createdAt: 'desc' } }); } catch { careers = []; }
  return (
    <>
      <AnalyticsTracker />
      <Navbar />
      <CareersClient careers={careers} />
      <Footer />
    </>
  );
}
