import { BadgeConfig } from './badge.types';
import { DEFAULT_COMPONENT_CONFIG } from '../../constants';

// Default badge configuration
export const DEFAULT_BADGE_CONFIG: BadgeConfig = {
  ...DEFAULT_COMPONENT_CONFIG,
  removable: false,
  clickable: true,
};

// Badge size configurations
export const BADGE_SIZE_CONFIGS = {
  sm: {
    padding: 'px-2 py-1',
    textSize: 'text-xs',
  },
  md: {
    padding: 'px-3 py-1.5',
    textSize: 'text-sm',
  },
  lg: {
    padding: 'px-4 py-2',
    textSize: 'text-base',
  },
};

// Badge color configurations
export const BADGE_COLOR_CONFIGS = {
  gray: {
    background: 'bg-gray-100',
    text: 'text-gray-800',
    border: 'border-gray-300',
    hover: 'hover:bg-gray-200',
  },
  blue: {
    background: 'bg-blue-100',
    text: 'text-blue-800',
    border: 'border-blue-300',
    hover: 'hover:bg-blue-200',
  },
  green: {
    background: 'bg-green-100',
    text: 'text-green-800',
    border: 'border-green-300',
    hover: 'hover:bg-green-200',
  },
  yellow: {
    background: 'bg-yellow-100',
    text: 'text-yellow-800',
    border: 'border-yellow-300',
    hover: 'hover:bg-yellow-200',
  },
  red: {
    background: 'bg-red-100',
    text: 'text-red-800',
    border: 'border-red-300',
    hover: 'hover:bg-red-200',
  },
  purple: {
    background: 'bg-purple-100',
    text: 'text-purple-800',
    border: 'border-purple-300',
    hover: 'hover:bg-purple-200',
  },
  indigo: {
    background: 'bg-indigo-100',
    text: 'text-indigo-800',
    border: 'border-indigo-300',
    hover: 'hover:bg-indigo-200',
  },
  pink: {
    background: 'bg-pink-100',
    text: 'text-pink-800',
    border: 'border-pink-300',
    hover: 'hover:bg-pink-200',
  },
};

// Badge variant configurations
export const BADGE_VARIANT_CONFIGS = {
  default: {
    classes: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
  },
  outline: {
    classes: 'border text-gray-800 hover:bg-gray-50',
  },
  solid: {
    classes: 'text-white',
  },
  ghost: {
    classes: 'bg-transparent text-gray-800 hover:bg-gray-100',
  },
};

// Common badge configurations
export const COMMON_BADGE_CONFIGS = {
  filter: {
    variant: 'outline',
    size: 'md',
    color: 'gray',
    clickable: true,
    removable: false,
  },
  status: {
    variant: 'solid',
    size: 'sm',
    color: 'green',
    clickable: false,
    removable: false,
  },
  tag: {
    variant: 'default',
    size: 'sm',
    color: 'blue',
    clickable: true,
    removable: true,
  },
};
