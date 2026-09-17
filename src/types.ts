export type Platform = 'windows' | 'macos' | 'all';

export type CategoryId =
  | 'windows'
  | 'macos'
  | 'beginners-guide'
  | 'tutorials'
  | 'guides'
  | 'new-drops'
  | 'extensions-scripts'
  | 'free-assets'
  | 'piracy';

export type PageId =
  | 'home'
  | CategoryId
  | 'extract-guide'
  | 'install-guide'
  | 'about'
  | 'faq';

export interface Resource {
  id: string;
  name: string;
  description: string;
  link: string;
  category: CategoryId;
  platform: Platform;
  tags: string[];
  author?: string;
  license?: string;
  isVerified?: boolean;
  lastVerified?: string;
  version?: string;
  verifiedSource?: string;
  featured?: boolean;
  section?: string;
}

export interface Category {
  id: CategoryId;
  title: string;
  description: string;
  icon: string;
  section: string;
  tag: string;
  platform?: Platform;
  badge?: string;
  href?: string;
  count?: string;
}
