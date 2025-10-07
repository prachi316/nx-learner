// Common base interfaces and types used across the application

// Base item interface with common properties
export interface BaseItem {
  id: string;
  label: string;
  active?: boolean;
  disabled?: boolean;
}

// Status types
export type ItemStatus =
  | 'active'
  | 'inactive'
  | 'completed'
  | 'in-progress'
  | 'pending'
  | 'missed'
  | 'available';

// Size types
export type ComponentSize = 'sm' | 'md' | 'lg';

// Color types
export type ComponentColor =
  | 'gray'
  | 'blue'
  | 'green'
  | 'yellow'
  | 'red'
  | 'purple'
  | 'indigo'
  | 'pink'
  | 'orange'
  | 'teal'
  | 'cyan';

// Variant types
export type ComponentVariant = 'default' | 'outline' | 'solid' | 'ghost' | 'pills' | 'underline';

// Badge configuration
export interface BadgeConfig {
  text: string;
  color?: string;
  backgroundColor?: string;
}

// User information
export interface UserInfo {
  id: string;
  name: string;
  role: string;
  avatar?: string | null;
  email?: string;
}

// School information
export interface SchoolInfo {
  id: string;
  name: string;
  fullName: string;
  semester: string;
  academicYear?: string;
}

// Version information
export interface VersionInfo {
  version: string;
  copyright: string;
  buildDate?: string;
}

// Navigation item
export interface NavItem extends BaseItem {
  icon: string;
  href?: string;
  badge?: BadgeConfig;
}

// Breadcrumb item
export interface BreadcrumbItem extends BaseItem {
  url?: string;
}

// Tab item
export interface TabItem extends BaseItem {
  badge?: BadgeConfig;
}

// Badge item
export interface BadgeItem extends BaseItem {
  config?: BadgeConfig;
}

// Course information
export interface CourseInfo {
  id: string;
  title: string;
  description?: string;
  status: ItemStatus;
  progress: number;
  todos: {
    pending: number;
    missed: number;
  };
  instructors: string[];
  level: string;
  duration?: string;
  startDate?: string;
  endDate?: string;
}

// Course content item
export interface CourseContentItem {
  id: string;
  type: 'video' | 'assignment' | 'attachment' | 'exam' | 'quiz';
  title: string;
  status: ItemStatus;
  duration?: string;
  dueDate?: string;
  fileType?: string;
  description?: string;
}

// Weekly content
export interface WeeklyContent {
  id: string;
  title: string;
  date: string;
  status: ItemStatus;
  items: CourseContentItem[];
}

// Progress card
export interface ProgressCard {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  iconColor: string;
  iconBgColor: string;
  iconTextColor: string;
  progress: number;
  completed: number;
  total: number;
}

// Empty state configuration
export interface EmptyStateConfig {
  icon: string;
  title: string;
  description: string;
  actionText?: string;
  actionUrl?: string;
}
