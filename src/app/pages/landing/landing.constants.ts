import { BreadcrumbItem } from '@nx-learner/types';

// Default breadcrumb configuration
export const DEFAULT_BREADCRUMB: BreadcrumbItem[] = [
  { id: 'courses', label: 'Courses', url: '/courses', active: false },
  { id: 'course-details', label: 'Course Details', url: '/course-details', active: true },
];

// Default page title
export const DEFAULT_PAGE_TITLE = 'Course Details';

// Navigation item to breadcrumb mapping
export const NAVIGATION_BREADCRUMB_MAP: Record<
  string,
  { breadcrumb: BreadcrumbItem[]; title: string }
> = {
  feed: {
    breadcrumb: [{ id: 'feed', label: 'Feed', url: '/feed', active: true }],
    title: 'Feed',
  },
  pickup: {
    breadcrumb: [{ id: 'pickup', label: 'Pickup', url: '/pickup', active: true }],
    title: 'Pickup',
  },
  chat: {
    breadcrumb: [{ id: 'chat', label: 'Chat', url: '/chat', active: true }],
    title: 'Chat',
  },
  course: {
    breadcrumb: [{ id: 'course', label: 'Course', url: '/course', active: true }],
    title: 'Course',
  },
  'course-management': {
    breadcrumb: [
      {
        id: 'course-management',
        label: 'Course Management',
        url: '/course-management',
        active: true,
      },
    ],
    title: 'Course Management',
  },
  vcr: {
    breadcrumb: [{ id: 'vcr', label: 'VCR', url: '/vcr', active: true }],
    title: 'VCR',
  },
  'grade-management': {
    breadcrumb: [
      { id: 'grade-management', label: 'Grade Management', url: '/grade-management', active: true },
    ],
    title: 'Grade Management',
  },
};

// Default fallback configuration
export const DEFAULT_NAVIGATION_CONFIG = {
  breadcrumb: [{ label: 'Dashboard', url: '/dashboard', active: true }],
  title: 'Dashboard',
};
