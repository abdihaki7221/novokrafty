import './globals.css';

export const metadata = {
  title: 'Novokraft Limited — Software, Engineered in Nairobi',
  description: 'Novokraft builds production software for East Africa: fintech infrastructure, ERPs, AI agents, mobile apps and the systems behind ambitious companies.',
  keywords: ['software development', 'fintech', 'ERP', 'CRM', 'AI', 'chatbots', 'mobile development', 'web development', 'Nairobi', 'Kenya'],
  openGraph: {
    title: 'Novokraft Limited',
    description: 'Software, Engineered in Nairobi',
    url: 'https://novokraft.com',
    siteName: 'Novokraft',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#07090b" />
      </head>
      <body className="antialiased">
        {/* Film grain */}
        <div className="noise-overlay" />

        {/* Ambient background: quiet mesh + engineering grid */}
        <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0 bg-mesh-gradient" />
          <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-40" />
          {/* Single slow lime bloom — one light source */}
          <div
            className="absolute -top-40 right-[-10%] w-[640px] h-[640px] rounded-full opacity-[0.05] animate-float"
            style={{ background: 'radial-gradient(circle, rgba(198,242,58,0.7), transparent 65%)' }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
