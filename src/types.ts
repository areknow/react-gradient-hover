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
   * Whether the component is in an active state
   */
  isActive?: boolean;

  /**
   * Animation speed (0.01 = slower, 0.1 = faster)
   * @default 0.01
   */
  animationSpeed?: number;

  /**
   * Border radius of the component
   * @default '10px'
   */
  borderRadius?: string;

  /**
   * Duration of the gradient transition animation in seconds
   * @default 1
   */
  transitionDuration?: number;

  /**
   * Opacity of the active overlay when clicking
   * @default 0.05
   */
  activeOverlayOpacity?: number;

  /**
   * Whether to always show the gradient hover effect
   * @default true
   */
  shouldAlwaysShowGradient?: boolean;
}
