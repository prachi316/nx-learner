import {
  TabItem,
  BadgeItem,
  CourseInfo,
  ProgressCard,
  WeeklyContent,
  EmptyStateConfig,
} from '@nx-learner/types';

// Main navigation tabs configuration
export const MAIN_TABS: TabItem[] = [
  {
    id: 'all',
    label: 'All',
    active: true,
  },
  {
    id: 'todo',
    label: 'ToDo',
    badge: {
      text: '4',
      backgroundColor: '#EF4444',
      color: 'white',
    },
  },
];

// Secondary filter badges configuration
export const FILTER_BADGES: BadgeItem[] = [
  {
    id: 'videos',
    label: 'Videos',
  },
  {
    id: 'attachments',
    label: 'Attachments',
  },
  {
    id: 'assignments',
    label: 'Assignments',
  },
  {
    id: 'exams',
    label: 'Exams',
  },
];

// Course information
export const COURSE_INFO: CourseInfo = {
  id: 'chem-001',
  title: 'Chemistry',
  description:
    'Fundamental concepts of chemistry including atomic structure, chemical bonding, and reaction mechanisms.',
  status: 'completed',
  progress: 75,
  todos: {
    pending: 3,
    missed: 1,
  },
  instructors: ['Ahmed Al-Farouq', 'Talha Munir'],
  level: 'Level 1 Class 02',
  duration: '12 weeks',
  startDate: '2024-01-15',
  endDate: '2024-04-15',
};

// Course content data
export const COURSE_CONTENT = {
  allTopics: {
    title: 'All Topics',
    description:
      'This course covers the fundamental concepts of chemistry including atomic structure, chemical bonding, and reaction mechanisms. Students will learn about the periodic table, chemical equations, and laboratory techniques.',
    showMoreText: 'Show more',
  },
  weeklyContent: {
    week1: {
      title: 'Week 1',
      date: 'Jan 15 - Jan 21',
      status: 'Completed',
      items: [
        {
          type: 'video',
          title: 'Introduction to Chemistry',
          duration: '45 min',
          status: 'completed',
        },
        {
          type: 'assignment',
          title: 'Atomic Structure Quiz',
          dueDate: 'Jan 20',
          status: 'completed',
        },
      ],
    },
    week2: {
      title: 'Week 2',
      date: 'Jan 22 - Jan 28',
      status: 'In Progress',
      items: [
        {
          type: 'video',
          title: 'Chemical Bonding',
          duration: '52 min',
          status: 'in-progress',
        },
        {
          type: 'attachment',
          title: 'Periodic Table Reference',
          fileType: 'PDF',
          status: 'available',
        },
      ],
    },
  },
};

// Empty state configuration
export const EMPTY_STATE: EmptyStateConfig = {
  icon: 'empty-state',
  title: 'No content available',
  description: 'There are no items to display for the selected filters.',
  actionText: 'Clear filters',
};

// Tab and badge configurations
export const TAB_CONFIGS = {
  mainTabs: {
    variant: 'pills' as const,
    size: 'md' as const,
    fullWidth: true,
  },
  filterBadges: {
    variant: 'outline' as const,
    size: 'md' as const,
    color: 'gray' as const,
    clickable: true,
  },
};

// Progress cards data
export const PROGRESS_CARDS: ProgressCard[] = [
  {
    id: 'videos',
    title: 'Videos',
    subtitle: 'Watched',
    icon: 'video-Icon',
    progress: 42,
    completed: 14,
    total: 33,
  },
  {
    id: 'attachments',
    title: 'Attachments',
    subtitle: 'Opened',
    icon: 'attachment-Icon',
    progress: 78,
    completed: 80,
    total: 102,
  },
  {
    id: 'assignments',
    title: 'Assignments',
    subtitle: 'Submitted',
    icon: 'assignment-Icon',
    progress: 80,
    completed: 44,
    total: 55,
  },
  {
    id: 'exams',
    title: 'Exams',
    subtitle: 'Submitted',
    icon: 'exam-Icon',
    progress: 78,
    completed: 28,
    total: 36,
  },
];
