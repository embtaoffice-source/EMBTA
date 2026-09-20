import { TimelineMilestone } from '../types';

export const aboutData = {
  hero: {
    badge: 'ESTD. [Established Year] • APEX COMMERCIAL BODY',
    title: 'ABOUT EMBTA',
    subtitle: 'The Eastern Maring Business & Traders Association is the constitutional collective representing regional enterprises, commerce facilitators, and grassroots entrepreneurs.',
  },

  whoWeAre: {
    title: 'WHO WE ARE',
    lead: 'An apex institutional body established to combine commercial strength and syndicate mutual trust.',
    body: 'The Eastern Maring Business & Traders Association (EMBTA) serves as the primary representative forum for merchant guilds, logistics syndicates, small manufacturers, and retail operators in the region. Formed to defend trade rights, arbitrate interstate freight bottlenecks, and spur collective economic security, EMBTA bridges traditional commerce and progressive modern trade frameworks.',
    quote: '“Combine, Syndicate a Trust”',
  },

  background: {
    title: 'ASSOCIATION BACKGROUND',
    description: 'A brief historical record illustrating the evolution of our regional trade collective and governance.',
    historyPlaceholder: '[Association History]',
    foundingInfoPlaceholder: '[Founding Information]',
    milestones: [
      {
        year: '[Established Year]',
        title: 'Formal Constitution & Inauguration',
        description: '[Founding Information] - Assembled by foundational trade representatives to establish a unified commercial voice.',
      },
      {
        year: 'Phase II',
        title: 'Establishment of 4 Key Wings',
        description: 'Structured the Traders, Transporters, Timber, and Enterprise divisions to address specialized logistical and regulatory requirements.',
      },
      {
        year: 'Phase III',
        title: 'Highway Transit & Freight Accord',
        description: 'Initiated structured liaison with administrative authorities to ensure uninhibited cargo movements and fair toll structures.',
      },
      {
        year: 'Current Term',
        title: 'Digital Secretariat & Modernization',
        description: 'Implementation of official member registries, digital verification standards, and public gazette communications.',
      },
    ] as TimelineMilestone[],
  },

  mission: {
    title: 'MISSION',
    content: '[Official Mission]',
    supportingText: 'Dedicated to championing equitable commercial rights, fostering business literacy, and ensuring transparency across regional supply channels.',
  },

  vision: {
    title: 'VISION',
    content: '[Official Vision]',
    supportingText: 'Envisioning a dynamic, resilient regional economy where local enterprises flourish through syndicated trust, sustainable innovation, and ethical commerce.',
  },

  purposeItems: [
    {
      title: 'Business Connection',
      description: 'Creating robust conduits between isolated rural producers, transport operators, and major terminal marketplaces.',
      tag: 'Connectivity',
      isDemo: true,
    },
    {
      title: 'Collaboration',
      description: 'Fostering synergistic cooperation among cross-sectoral merchant groups to achieve collective bargaining and volume efficiencies.',
      tag: 'Synergy',
      isDemo: true,
    },
    {
      title: 'Community Engagement',
      description: 'Aligning business priorities with civic welfare, infrastructure upkeep, and cultural heritage preservation.',
      tag: 'Civic Duty',
      isDemo: true,
    },
    {
      title: 'Sustainable Growth',
      description: 'Promoting environmentally accountable trading practices, responsible timber sourcing, and enduring commercial prosperity.',
      tag: 'Ecology',
      isDemo: true,
    },
  ],

  objectives: [
    {
      id: 'OBJ-01',
      title: 'Strengthen Business Connections',
      description: 'Build robust inter-district trade corridors and structured networks for micro, small, and medium business entities.',
    },
    {
      id: 'OBJ-02',
      title: 'Encourage Collaboration',
      description: 'Facilitate roundtables, joint purchasing syndicates, and unified dispute-resolution forums across commercial sectors.',
    },
    {
      id: 'OBJ-03',
      title: 'Support Business Development',
      description: 'Provide capacity building, regulatory compliance guidance, financial literacy, and technological modernizations.',
    },
    {
      id: 'OBJ-04',
      title: 'Promote Community Engagement',
      description: 'Partner with local village councils, elders, and youth bodies to ensure business prosperity translates into social well-being.',
    },
    {
      id: 'OBJ-05',
      title: 'Create Shared Opportunities',
      description: 'Formulate cooperative investment initiatives, collective insurance arrangements, and mutual emergency relief buffers.',
    },
  ],

  networkNodes: [
    { name: 'Businesses', role: 'Enterprises & Retailers', x: -140, y: -70, color: '#1b873f' },
    { name: 'Traders', role: 'Wholesale & Border Merchants', x: 140, y: -70, color: '#24a14d' },
    { name: 'Community', role: 'Civic & Village Councils', x: 160, y: 70, color: '#8ca4c2' },
    { name: 'Collaboration', role: 'Syndicates & Guilds', x: 0, y: 150, color: '#cee5ff' },
    { name: 'Growth', role: 'Sustainable Enterprise', x: -160, y: 70, color: '#102a43' },
  ],
};
