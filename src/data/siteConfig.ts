import { NavItem } from '../types';

export const siteConfig = {
  name: 'Eastern Maring Business & Traders Association',
  shortName: 'EMBTA',
  motto: '“Combine, Syndicate a Trust”',
  headline: 'Connecting Businesses. Strengthening Communities.',
  supportingText: 'Building connections, encouraging collaboration and supporting business and community development.',
  logoUrl: '/assets/embta-logo.png',
  copyright: '© 2026 Eastern Maring Business & Traders Association. All rights reserved.',
  
  // Mandatory Official Contact & Form Settings
  // NOTE: Updating `email` here automatically updates:
  // 1. The Global Website Footer display & mailto link
  // 2. The Contact Desk Information Card
  // 3. The destination inbox where Contact Form submissions are delivered!
  contact: {
    address: '[Association Address]',
    phone: '[Official Phone Number]',
    email: '[Official Email Address]', // e.g. 'secretariat@embta-org.in' or 'contact@embta.org'
    formRecipientEmail: '', // Optional: If empty, defaults to `email` above for form delivery
    officeHours: '[Office Hours]',
    emergencyDesk: '[Emergency Highway Transit Desk]',
  },

  socialLinks: [
    { name: 'Official Bulletin', href: '#', icon: 'FileText' },
    { name: 'Secretariat Dispatch', href: '#', icon: 'Mail' },
    { name: 'Public Notices', href: '#', icon: 'Bell' },
  ],

  navLinks: [
    { title: 'HOME', href: '/' },
    { title: 'ABOUT EMBTA', href: '/about' },
    { title: 'EXECUTIVE PROFILE', href: '/executive' },
    { title: 'GALLERY', href: '/gallery' },
    { title: 'NEWS', href: '/news' },
    { title: 'CONTACT DESK', href: '/contact', badge: 'REACH US' },
  ] as NavItem[],

  wings: [
    {
      title: 'Traders & Merchants Guild',
      code: 'TMG-WING',
      desc: 'Advocating fair trade, price stability, and sustainable commercial operations across regional markets.',
      icon: 'Store',
    },
    {
      title: 'Transporters & Logistics Wing',
      code: 'TLW-WING',
      desc: 'Ensuring safe, efficient freight transit, checkpoint facilitation, and fleet operator solidarity.',
      icon: 'Truck',
    },
    {
      title: 'Timber & Forestry Trade Wing',
      code: 'TFW-WING',
      desc: 'Statutory compliance, legal timber transit, and ecological conservation stewardship.',
      icon: 'Trees',
    },
    {
      title: 'Enterprise & Services Wing',
      code: 'ESW-WING',
      desc: 'Supporting micro-enterprises, skilled service contractors, and digital commerce readiness.',
      icon: 'Briefcase',
    },
  ],

  coreValues: [
    {
      title: 'Institutional Trust',
      tagline: 'Syndicated Credibility',
      desc: 'Fostering collective transparency and unyielding statutory accountability across all trade interactions.',
      icon: 'ShieldCheck',
    },
    {
      title: 'Commercial Unity',
      tagline: 'Combine & Empower',
      desc: 'Unifying individual traders, logistics operators, and local merchants into a formidable economic voice.',
      icon: 'Users',
    },
    {
      title: 'Equitable Advocacy',
      tagline: 'Fair Representation',
      desc: 'Representing stakeholder rights before governmental, regional, and statutory trade regulators.',
      icon: 'Scale',
    },
    {
      title: 'Regional Development',
      tagline: 'Community Progress',
      desc: 'Catalyzing grassroots entrepreneurship, infrastructure betterment, and communal prosperity.',
      icon: 'TrendingUp',
    },
  ],
};
