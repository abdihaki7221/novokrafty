import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AnalyticsTracker from '@/components/AnalyticsTracker';
import AboutClient from './AboutClient';
import { prisma } from '@/lib/prisma';

export const metadata = { title: 'About — Novokraft Limited' };

export default async function AboutPage() {
  let settings = null, team = [], partners = [];
  try {
    [settings, team, partners] = await Promise.all([
      prisma.siteSettings.findUnique({ where: { id: 'main' } }),
      prisma.teamMember.findMany({ where: { published: true }, orderBy: { sortOrder: 'asc' } }),
      prisma.partner.findMany({ where: { published: true }, orderBy: { sortOrder: 'asc' } }),
    ]);
  } catch {
    settings = {
      mission: 'We engineer the digital backbone of tomorrow\'s enterprises.',
      vision: 'To become Africa\'s most trusted technology partner.',
      values: ['Engineering Excellence', 'Client-First Thinking', 'Relentless Innovation', 'Radical Transparency'],
    };
    team = [];
    partners = [];
  }
  return (
    <>
      <AnalyticsTracker />
      <Navbar />
      <AboutClient settings={settings} team={team} partners={partners} />
      <Footer />
    </>
  );
}
