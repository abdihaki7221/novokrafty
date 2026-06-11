-- ════════════════════════════════════════════════════════════
-- Novokraft — Dynamic Content Migration
-- Adds all new editable content columns to SiteSettings.
-- Safe to run on existing databases (uses IF NOT EXISTS).
-- ════════════════════════════════════════════════════════════

ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "showSocials" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "whatsappNumber" TEXT DEFAULT '+254707332229';
ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "whatsappMessage" TEXT DEFAULT 'Hi Novokraft, I''d like to discuss a project.';

-- Hero
ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "heroBadge" TEXT NOT NULL DEFAULT 'Pioneering Digital Transformation Across Africa';
ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "heroTitleLine1" TEXT NOT NULL DEFAULT 'We Architect';
ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "heroTitleLine2" TEXT NOT NULL DEFAULT 'Software That';
ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "heroTitleHighlight" TEXT NOT NULL DEFAULT 'Moves Needles';
ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "heroSubtitle" TEXT NOT NULL DEFAULT 'From fintech infrastructure to AI-powered agents, we engineer the systems that power East Africa''s most ambitious companies.';
ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "heroCtaPrimary" TEXT NOT NULL DEFAULT 'Start Your Project';
ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "heroCtaSecondary" TEXT NOT NULL DEFAULT 'View Our Work';
ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "techStack" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- Stats
ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "stat1Value" TEXT NOT NULL DEFAULT '120+';
ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "stat1Label" TEXT NOT NULL DEFAULT 'Projects Delivered';
ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "stat2Value" TEXT NOT NULL DEFAULT '45+';
ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "stat2Label" TEXT NOT NULL DEFAULT 'Active Clients';
ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "stat3Value" TEXT NOT NULL DEFAULT '30+';
ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "stat3Label" TEXT NOT NULL DEFAULT 'Team Members';
ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "stat4Value" TEXT NOT NULL DEFAULT '99.9%';
ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "stat4Label" TEXT NOT NULL DEFAULT 'Uptime SLA';

-- Section headings
ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "servicesSubtitle" TEXT NOT NULL DEFAULT 'Capabilities';
ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "servicesTitle" TEXT NOT NULL DEFAULT 'Full-Spectrum Software Engineering';
ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "servicesDesc" TEXT NOT NULL DEFAULT 'We don''t just write code. We architect systems that scale, delight users, and drive measurable business outcomes.';
ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "projectsSubtitle" TEXT NOT NULL DEFAULT 'Portfolio';
ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "projectsTitle" TEXT NOT NULL DEFAULT 'Projects That Speak Volumes';
ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "projectsDesc" TEXT NOT NULL DEFAULT 'Real solutions, shipped to production, driving results for real businesses.';
ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "testimonialsSubtitle" TEXT NOT NULL DEFAULT 'Testimonials';
ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "testimonialsTitle" TEXT NOT NULL DEFAULT 'Trusted by Ambitious Companies';

-- CTA
ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "ctaTitle" TEXT NOT NULL DEFAULT 'Ready to Build Something Extraordinary?';
ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "ctaDesc" TEXT NOT NULL DEFAULT 'Let''s turn your vision into production-grade reality. Tell us about your project.';
ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "ctaButton" TEXT NOT NULL DEFAULT 'Get In Touch';

-- Contact page
ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "contactSubtitle" TEXT NOT NULL DEFAULT 'Contact';
ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "contactTitle" TEXT NOT NULL DEFAULT 'Let''s Start a Conversation';
ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "contactDesc" TEXT NOT NULL DEFAULT 'Tell us about your project and we''ll get back to you immediately.';
ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "contactMode" TEXT NOT NULL DEFAULT 'whatsapp';
ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "contactLocation" TEXT NOT NULL DEFAULT 'Westlands, Nairobi, Kenya';
ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "contactLocationSub" TEXT NOT NULL DEFAULT 'East Africa';
ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "contactHoursValue" TEXT NOT NULL DEFAULT 'Monday — Friday';
ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "contactHoursSub" TEXT NOT NULL DEFAULT '8:00 AM — 6:00 PM EAT';
ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "contactEmailSub" TEXT NOT NULL DEFAULT 'We reply immediately';
ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "contactPhoneSub" TEXT NOT NULL DEFAULT 'Mon–Fri, 8AM–6PM';

-- About page
ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "aboutSubtitle" TEXT NOT NULL DEFAULT 'About Novokraft';
ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "aboutTitle" TEXT NOT NULL DEFAULT 'The Story Behind the Code';
ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "aboutDesc" TEXT NOT NULL DEFAULT 'We''re not just developers. We''re craftspeople obsessed with building software that transforms how businesses operate.';

-- Footer
ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "footerTagline" TEXT NOT NULL DEFAULT 'Engineering the digital backbone of tomorrow''s enterprises. From Nairobi to the world.';
ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "footerCopyright" TEXT NOT NULL DEFAULT 'Novokraft Limited. All rights reserved.';

-- Optionally hide existing seeded social links so they don't show (since showSocials defaults false they're hidden anyway)
