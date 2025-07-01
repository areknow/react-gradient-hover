import { CSSProperties, ReactNode } from "react";

export interface GradientHoverProps {
  /**
   * The gradient colors to use. Must be an array of 2 colors.
   * @default ['#ff6b6b', '#4ecdc4']
   */
  colors?: [string, string];

  /**
   * The content to wrap with gradient hover effect
   */
  children: ReactNode;

  /**
   * Additional CSS classes to apply
   */
  className?: string;

  /**
   * Inline styles to apply
   */
  style?: CSSProperties;

  /**
   * Click handler
   */
  onClick?: () => void;

  /**
   * Animation speed from 1 (slowest) to 10 (fastest)
   * @default 3
   */
  animationSpeed?: number;

  /**
   * Duration of the gradient transition animation in seconds
   * @default 1
   */
  transitionDuration?: number;

  /**
   * Whether to always show the gradient hover effect
   * @default true
   */
  shouldAlwaysShowGradient?: boolean;
}
