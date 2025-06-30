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
}
