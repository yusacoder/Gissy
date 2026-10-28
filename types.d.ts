export interface BackgroundConfig {
  imageUrl: string;
  blur: number; // 1 - 100
  overlayOpacity: number; // 0 - 100
  enabled: boolean;
  position?: string;
  size?: string;
  repeat?: string;
}

export interface SiteSettings {
  maintenanceMode: boolean;
  maintenanceMessage: {
    tr: string;
    en: string;
  };
}

export interface Profile {
  name: string;
  handle: string;
  showVerifiedBadge: boolean;
  avatarUrl: string;
  bio: {
    tr: string;
    en: string;
  };
}

export interface LinkItem {
  id: string;
  title: { tr: string; en: string } | string;
  subtitle?: { tr: string; en: string } | string;
  url: string;
  icon: string;
  badge?: { tr: string; en: string } | string;
  color?: string;
}

export interface DubbingProject {
  id: number;
  title: { tr: string; en: string } | string;
  category: { tr: string; en: string } | string;
  role: string;
  date: string;
  videoUrl: string;
  thumbnail: string;
  description: { tr: string; en: string } | string;
  tags?: string[];
}

export interface FooterConfig {
  copyright: { tr: string; en: string } | string;
  eternalProduction: {
    title: string;
    tagline: { tr: string; en: string } | string;
    url: string;
    logoText: string;
  };
}

export interface SiteData {
  background?: BackgroundConfig;
  siteSettings?: SiteSettings;
  profile?: Profile;
  links?: LinkItem[];
  dubbingProjects?: DubbingProject[];
  footer?: FooterConfig;
  translations?: Record<string, any>;
}
