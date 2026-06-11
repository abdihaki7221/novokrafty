import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET() {
  try {
    let settings = await prisma.siteSettings.findUnique({ where: { id: 'main' } });
    if (!settings) {
      settings = await prisma.siteSettings.create({ data: { id: 'main', values: [], techStack: [] } });
    }
    return NextResponse.json(settings);
  } catch (e) {
    return NextResponse.json({ error: 'Failed to load settings', detail: e.message }, { status: 500 });
  }
}

export async function PUT(req) {
  if (!(await getSession())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const b = await req.json();

    // Whitelist of all editable fields. Anything passed gets saved.
    const fields = [
      'companyName', 'tagline', 'email', 'phone', 'address', 'mission', 'vision',
      'linkedin', 'twitter', 'github', 'youtube', 'showSocials',
      'whatsappNumber', 'whatsappMessage',
      'heroBadge', 'heroTitleLine1', 'heroTitleLine2', 'heroTitleHighlight', 'heroSubtitle',
      'heroCtaPrimary', 'heroCtaSecondary',
      'stat1Value', 'stat1Label', 'stat2Value', 'stat2Label',
      'stat3Value', 'stat3Label', 'stat4Value', 'stat4Label',
      'servicesSubtitle', 'servicesTitle', 'servicesDesc',
      'projectsSubtitle', 'projectsTitle', 'projectsDesc',
      'testimonialsSubtitle', 'testimonialsTitle',
      'ctaTitle', 'ctaDesc', 'ctaButton',
      'contactSubtitle', 'contactTitle', 'contactDesc', 'contactMode',
      'contactLocation', 'contactLocationSub', 'contactHoursValue', 'contactHoursSub',
      'contactEmailSub', 'contactPhoneSub',
      'aboutSubtitle', 'aboutTitle', 'aboutDesc',
      'footerTagline', 'footerCopyright',
    ];

    const data = {};
    for (const f of fields) {
      if (b[f] !== undefined) data[f] = b[f];
    }
    // Array fields
    if (b.values !== undefined) data.values = Array.isArray(b.values) ? b.values : [];
    if (b.techStack !== undefined) data.techStack = Array.isArray(b.techStack) ? b.techStack : [];

    const settings = await prisma.siteSettings.upsert({
      where: { id: 'main' },
      update: data,
      create: { id: 'main', ...data, values: data.values || [], techStack: data.techStack || [] },
    });
    return NextResponse.json(settings);
  } catch (e) {
    return NextResponse.json({ error: 'Failed to save', detail: e.message }, { status: 500 });
  }
}
