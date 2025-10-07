// Re-export shared types
export type { BadgeItem } from '@nx-learner/types';

// Import types for local use
import type { ComponentSize, ComponentColor, ComponentVariant } from '@nx-learner/types';

// Badge-specific configuration interface
export interface BadgeConfig {
  variant?: ComponentVariant;
  size?: ComponentSize;
  color?: ComponentColor;
  removable?: boolean;
  clickable?: boolean;
}
