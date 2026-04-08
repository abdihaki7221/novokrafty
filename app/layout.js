import './globals.css';

export const metadata = {
  title: 'Novokraft Limited — Engineering the Future of Software',
  description: 'Novokraft builds world-class software solutions: fintech, ERPs, CRMs, AI agents, mobile apps, and more. East Africa\'s most innovative tech partner.',
  keywords: ['software development', 'fintech', 'ERP', 'CRM', 'AI', 'chatbots', 'mobile development', 'web development', 'Nairobi', 'Kenya'],
  openGraph: {
    title: 'Novokraft Limited',
    description: 'Engineering the Future of Software',
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
        <meta name="theme-color" content="#04040c" />
      </head>
      <body className="antialiased">
        {/* Noise Texture Overlay */}
        <div className="noise-overlay" />

        {/* Ambient Background */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          {/* Primary mesh gradient */}
          <div className="absolute inset-0 bg-mesh-gradient opacity-100" />

          {/* Grid pattern */}
          <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-30" />

          {/* Animated orbs */}
          <div className="absolute top-[10%] left-[15%] w-[500px] h-[500px] rounded-full opacity-[0.06] animate-float"
            style={{ background: 'radial-gradient(circle, rgba(76, 110, 245, 0.8), transparent 70%)' }} />
          <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-full opacity-[0.04] animate-float"
            style={{ background: 'radial-gradient(circle, rgba(34, 211, 238, 0.8), transparent 70%)', animationDelay: '3s' }} />
          <div className="absolute top-[60%] left-[60%] w-[300px] h-[300px] rounded-full opacity-[0.05] animate-float"
            style={{ background: 'radial-gradient(circle, rgba(168, 85, 247, 0.8), transparent 70%)', animationDelay: '6s' }} />
        </div>

        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
