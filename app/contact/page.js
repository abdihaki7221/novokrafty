import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AnalyticsTracker from '@/components/AnalyticsTracker';
import ContactClient from './ContactClient';

export const metadata = { title: 'Contact — Novokraft Limited' };

export default function ContactPage() {
  return (
    <>
      <AnalyticsTracker />
      <Navbar />
      <ContactClient />
      <Footer />
    </>
  );
}
