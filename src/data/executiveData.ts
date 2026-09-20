import { Executive } from '../types';

export const executiveData = {
  hero: {
    badge: 'CONSTITUTIONAL DIRECTORATE',
    title: 'EXECUTIVE PROFILE',
    subtitle: 'The governing council tasked with executive leadership, administrative stewardship, and statutory advocacy for EMBTA members.',
    tenureNote: 'Tenure: 2024–2026 In Effect',
  },

  councilMessage: {
    title: 'A Message from the Executive Council',
    tagline: 'Official Communiqué',
    quote: '“Our commitment is to steer the commercial community toward solidarity, transparency, and collective prosperity. Together, we combine our strengths, syndicate our aspirations, and uphold the sacred trust reposed in this association.”',
    signatory: '[Office of the President & General Secretary, EMBTA - Tenured Term 2024–2026]',
    jurisdiction: 'Eastern Maring Regional Trade Jurisdiction',
    tenets: [
      'Statutory compliance with territorial market regulations and fair consumer practices.',
      'Equitable freight and pricing stability across local bazars and transit routes.',
      'Liaison and active arbitration of transit bottlenecks and trade grievances.',
    ],
  },

  // 6 Constitutional Portfolios required by specification
  executives: [
    {
      id: 'exec-pres',
      position: 'President',
      name: '[Name]',
      initials: 'PR',
      department: 'Executive Leadership & Apex Representation',
      tenure: '2024–2026',
      bio: '[Biography] - Responsible for the overall constitutional direction, executive governance, and strategic diplomacy of the association.',
      officialBadge: 'CONSTITUTIONAL APEX',
      coreResponsibilities: [
        'Apex statutory representation before government bodies',
        'Chairmanship of general council & executive sessions',
        'Executive sanctioning of bilateral trade memorandums',
      ],
    },
    {
      id: 'exec-vp',
      position: 'Vice President',
      name: '[Name]',
      initials: 'VP',
      department: 'Operations & Wing Coordination',
      tenure: '2024–2026',
      bio: '[Biography] - Oversees operational readiness, wing alignments, and deputizes for the President during statutory proceedings.',
      officialBadge: 'DEPUTY LEADERSHIP',
      coreResponsibilities: [
        'Inter-wing coordination across Traders & Logistics wings',
        'Dispute conciliation and regional grievance monitoring',
        'Presiding over regional outreach delegations',
      ],
    },
    {
      id: 'exec-gs',
      position: 'General Secretary',
      name: '[Name]',
      initials: 'GS',
      department: 'Central Secretariat & Institutional Administration',
      tenure: '2024–2026',
      bio: '[Biography] - Heads the administrative machinery, correspondence registries, and constitutional gazette publications.',
      officialBadge: 'CHIEF ADMINISTRATIVE OFFICER',
      coreResponsibilities: [
        'Maintenance of official secretariat archives & records',
        'Issuance of official notices, bulletins & circulars',
        'Executive coordination with law enforcement & transport cells',
      ],
    },
    {
      id: 'exec-ags',
      position: 'Assistant General Secretary',
      name: '[Name]',
      initials: 'AG',
      department: 'Secretariat Services & Member Registry',
      tenure: '2024–2026',
      bio: '[Biography] - Assists the General Secretariat in record verification, trade census compilation, and protocol management.',
      officialBadge: 'ASSOCIATE SECRETARIAT',
      coreResponsibilities: [
        'Supervision of digital membership ID verification',
        'Coordination of district sub-office field reports',
        'Recording official minutes of executive council meetings',
      ],
    },
    {
      id: 'exec-treasurer',
      position: 'Treasurer',
      name: '[Name]',
      initials: 'TR',
      department: 'Fiscal Governance & Audit Compliance',
      tenure: '2024–2026',
      bio: '[Biography] - Custodian of association assets, statutory accounts, annual audits, and member welfare funds.',
      officialBadge: 'FISCAL TRUSTEE',
      coreResponsibilities: [
        'Fiscal compliance and annual balance sheet audits',
        'Administration of emergency transit relief deposits',
        'Receipt and stewardship of annual subscription fees',
      ],
    },
    {
      id: 'exec-member',
      position: 'Executive Member',
      name: '[Name]',
      initials: 'EM',
      department: 'Public Affairs & Community Liaison',
      tenure: '2024–2026',
      bio: '[Biography] - Bridges village councils, local trade circles, and merchant syndicates to the core leadership.',
      officialBadge: 'COUNCIL REPRESENTATIVE',
      coreResponsibilities: [
        'Grassroots trader mobilization and grievance collection',
        'Facilitation of regional trade fairs and symposiums',
        'Civic welfare oversight and public relation support',
      ],
    },
  ] as Executive[],
};
