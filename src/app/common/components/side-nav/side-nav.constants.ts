import { NavItem } from './side-nav.types';

// Navigation items configuration
export const NAV_ITEMS: NavItem[] = [
  { id: 'feed', label: 'Feed', icon: 'feed', href: '/feed' },
  { id: 'course', label: 'Course', icon: 'course', active: true, href: '/course-details' },
  { id: 'pickup', label: 'Pickup', icon: 'pickup', href: '/pickup' },
  { id: 'chat', label: 'Chat', icon: 'chat', href: '/chat' },
  {
    id: 'course-management',
    label: 'Course Management',
    icon: 'course',
    href: '/course-management',
  },
  { id: 'vcr', label: 'VCR', icon: 'vcr', href: '/vcr' },
  {
    id: 'grade-management',
    label: 'Grade Management',
    icon: 'grade',
    href: '/grade-management',
  },
];

// School information
export const SCHOOL_INFO = {
  name: 'Al-Watania',
  fullName: 'Al-Watania School',
  semester: 'Spring Semester 2023-2024',
};

// User information
export const USER_INFO = {
  name: 'Student Name',
  role: 'Student',
  avatar: null,
};

// Version information
export const VERSION_INFO = {
  version: 'v1.28.0',
  copyright: 'Copyright @2025 nx',
};
