import { NavItem } from '../types';
import embtaLogo from '../assets/embta-logo.png';

export const siteConfig = {
  name: 'Eastern Maring Business & Traders Association',
  shortName: 'EMBTA',
  motto: '“Combine, Syndicate a Trust”',
  headline: 'Connecting Businesses. Strengthening Communities.',
  supportingText: 'Building connections, encouraging collaboration and supporting business and community development.',
  logoUrl: embtaLogo,
  copyright: '© 2026 Eastern Maring Business & Traders Association. All rights reserved.',
  
  // Official Institutional Credentials
  estd: 'Estd. 2022',
  regdNo: 'Govt. Regd. No. 5 of 2023',
  headOffice: 'Rilram Centre (RRC)',
  po: 'P.O. PALLEL',
  ps: 'P.S. TENGNOUPAL',
  district: 'DISTRICT TENGNOUPAL, MANIPUR - 795135',
  
  // Official Contact & Secretariat Coordinates
  contact: {
    headOffice: 'Rilram Centre (RRC)',
    po: 'P.O. PALLEL',
    ps: 'P.S. TENGNOUPAL',
    district: 'DISTRICT TENGNOUPAL, MANIPUR - 795135',
    address: 'Head Office: Rilram Centre (RRC), P.O. PALLEL, P.S. TENGNOUPAL, DISTRICT TENGNOUPAL, MANIPUR - 795135',
    regdNo: 'Govt. Regd. No. 5 of 2023',
    estd: 'Estd. 2022',
    phone: '+91 98765 43210',
    email: 'embtaoffice@gmail.com',
    formRecipientEmail: 'embtaoffice@gmail.com',
    officeHours: 'Monday – Friday, 9AM – 5PM',
    emergencyDesk: '[Emergency Highway Transit Desk]',
  },

  socialLinks: [
    { name: 'Eastern Maring Business & Traders Association', href: '#', icon: 'FileText' },
    { name: 'Eastern Maring Business & Traders Association', href: '#', icon: 'Mail' },
    { name: 'Eastern Maring Business & Traders Association', href: '#', icon: 'Bell' },
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
