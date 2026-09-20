// Core type definitions for EMBTA website

export interface NavItem {
  title: string;
  href: string;
  badge?: string;
}

export interface Executive {
  id: string;
  name: string; // Placeholder [Name]
  position: string;
  initials: string;
  department: string;
  tenure: string;
  bio: string; // Placeholder [Biography]
  avatarUrl?: string;
  officialBadge: string;
  coreResponsibilities: string[];
}

export interface MediaItem {
  id: string;
  title: string;
  type: 'IMAGE' | 'VIDEO' | 'YOUTUBE';
  category: string;
  url: string; // Image URL, Video URL, or YouTube URL
  thumbnailUrl?: string;
  date: string;
  description: string;
  isDemo?: boolean;
}

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  category: 'Association News' | 'Announcements' | 'Events' | 'Notices' | 'Business Updates';
  date: string;
  author: string;
  featuredImage: string;
  summary: string;
  content: string[]; // Multi-paragraph content
  isDemo: boolean;
  tags: string[];
}

export interface TimelineMilestone {
  year: string; // [Established Year] or year string
  title: string;
  description: string;
  iconName?: string;
}

export interface ContactFormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  subject: string;
  message: string;
}
