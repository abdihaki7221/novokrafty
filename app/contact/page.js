import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AnalyticsTracker from '@/components/AnalyticsTracker';
import ContactClient from './ContactClient';
import { prisma } from '@/lib/prisma';

export const metadata = { title: 'Contact — Novokraft Limited' };
export const dynamic = 'force-dynamic';

export default async function ContactPage() {
  let settings = null;
  try {
    settings = await prisma.siteSettings.findUnique({ where: { id: 'main' } });
  } catch {}
  return (
    <>
      <AnalyticsTracker />
      <Navbar />
      <ContactClient settings={settings} />
      <Footer />
    </>
  );
}
