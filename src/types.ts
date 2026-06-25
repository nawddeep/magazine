export interface MagazineIssue {
  id: string;
  title: string;
  category: string;
  issueNumber: string;
  releaseDate: string;
  coverUrl: string;
  pageLimit: number;
  description: string;
  status: 'Published' | 'Archived' | 'Draft';
  views: string;
  audience: string;
  isCustom?: boolean;
  pdfUrl?: string;
}

export interface EngagementStat {
  date: string;
  mobile: number;
  desktop: number;
}

export interface DashboardStats {
  subscribers: string;
  subscribersGrowth: string;
  revenue: string;
  revenueProjected: string;
  pageHits: string;
  pageHitsPeak: string;
}

export type AppView = 'public' | 'slider' | 'admin' | 'login' | 'magazine';

export type AdminTab = 'dashboard' | 'analytics' | 'content' | 'subscribers' | 'settings';
