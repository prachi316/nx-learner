import { TabConfig } from './tabs.types';
import { DEFAULT_COMPONENT_CONFIG } from '../../constants';

// Default tab configurations
export const DEFAULT_TAB_CONFIG: TabConfig = {
  ...DEFAULT_COMPONENT_CONFIG,
  fullWidth: false,
  centered: false,
};

// Tab size configurations
export const TAB_SIZE_CONFIGS = {
  sm: {
    padding: 'px-3 py-1.5',
    textSize: 'text-sm',
  },
  md: {
    padding: 'px-4 py-2',
    textSize: 'text-base',
  },
  lg: {
    padding: 'px-6 py-3',
    textSize: 'text-lg',
  },
};

// Tab variant configurations
export const TAB_VARIANT_CONFIGS = {
  default: {
    container: 'space-x-1',
    active: 'bg-blue-600 text-white',
    inactive: 'text-gray-600 hover:bg-gray-100',
  },
  pills: {
    container: 'bg-yellow-50 border border-yellow-200 rounded-lg p-1 gap-1',
    active: 'bg-yellow-400 text-gray-900',
    inactive: 'text-gray-700 hover:bg-gray-100',
  },
  underline: {
    container: 'border-b border-gray-200',
    active: 'text-blue-600 border-b-2 border-blue-600 bg-transparent',
    inactive: 'text-gray-500 hover:text-gray-700 hover:bg-gray-50',
  },
};

// Color configurations for different variants
export const TAB_COLOR_CONFIGS = {
  primary: {
    active: 'bg-blue-600 text-white',
    inactive: 'text-gray-600 hover:bg-gray-100',
  },
  success: {
    active: 'bg-green-600 text-white',
    inactive: 'text-gray-600 hover:bg-gray-100',
  },
  warning: {
    active: 'bg-yellow-600 text-white',
    inactive: 'text-gray-600 hover:bg-gray-100',
  },
  danger: {
    active: 'bg-red-600 text-white',
    inactive: 'text-gray-600 hover:bg-gray-100',
  },
};
