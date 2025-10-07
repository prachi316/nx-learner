// Re-export shared types
export type { TabItem } from '@nx-learner/types';

// Import types for local use
import type { ComponentSize, ComponentVariant } from '@nx-learner/types';

// Tab-specific configuration interface
export interface TabConfig {
  variant?: ComponentVariant;
  size?: ComponentSize;
  fullWidth?: boolean;
  centered?: boolean;
}
