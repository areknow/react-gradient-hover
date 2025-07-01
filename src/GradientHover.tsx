import React, {
  CSSProperties,
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import classNames from "classnames";
import debounce from "lodash.debounce";

import { GradientHoverProps } from "./types";

import "./GradientHover.scss";

const GradientHover: React.FC<GradientHoverProps> = ({
  colors = ["#ff6b6b", "#4ecdc4"],
  children,
  className = "",
  style = {},
  onClick,
  animationSpeed = 3,
  transitionDuration = 1,
  shouldAlwaysShowGradient = true,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState<
    { x: number; y: number } | undefined
  >(undefined);
  const [bounds, setBounds] = useState<
    { top: number; left: number; width: number; height: number } | undefined
  >(undefined);

  // Animation state for smooth trailing
  const targetPosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const currentPosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const animationFrame = useRef<number | undefined>(undefined);
  const isAnimatingToCenter = useRef(false);
  const isAnimationActive = useRef(false);

  // Ensure we have at least 2 colors for the gradient
  const validColors =
    colors && colors.length >= 2 ? colors : ["#ff6b6b", "#4ecdc4"];

  // Convert user-friendly speed (1-10) to internal speed (0.01-0.1)
  const internalAnimationSpeed =
    Math.max(1, Math.min(10, animationSpeed)) * 0.01;

  // Generate gradient string for CSS
  const generateGradient = (x: string, y: string) => {
    return `radial-gradient(circle at ${x} ${y}, ${validColors.join(", ")})`;
  };

  // Generate CSS variables for all gradient stops
  const colorStyles = {
    "--gradient-colors": validColors.join(", "),
    "--gradient-stop-count": validColors.length.toString(),
    "--transition-duration": `${transitionDuration}s`,
    "--gradient-background": generateGradient("50%", "50%"),
  } as CSSProperties;

  let dynamicStyles = {};
  if (mousePosition && bounds) {
    const x = `${Math.round((mousePosition.x / bounds.width) * 100)}%`;
    const y = `${Math.round((mousePosition.y / bounds.height) * 100)}%`;
    dynamicStyles = {
      "--gradient-x": x,
      "--gradient-y": y,
      "--gradient-background": generateGradient(x, y),
    } as CSSProperties;
  }

  // Helper function to get fresh bounds
  const getFreshBounds = useCallback(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      return {
        top: rect.top + scrollY,
        left: rect.left + scrollX,
        width: rect.width,
        height: rect.height,
        viewportTop: rect.top,
        viewportLeft: rect.left,
      };
    }
    return null;
  }, []);

  // Continuous animation function - runs while hovering or animating to center
  const animate = useCallback(() => {
    if (!isAnimationActive.current) {
      return;
    }

    const distX = targetPosition.current.x - currentPosition.current.x;
    const distY = targetPosition.current.y - currentPosition.current.y;

    // Check if we're close enough to the target to stop animating to center
    if (
      isAnimatingToCenter.current &&
      Math.abs(distX) < 1 &&
      Math.abs(distY) < 1
    ) {
      isAnimatingToCenter.current = false;
      isAnimationActive.current = false;
      setMousePosition(undefined);
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
        animationFrame.current = undefined;
      }
      return;
    }

    currentPosition.current.x += distX * internalAnimationSpeed;
    currentPosition.current.y += distY * internalAnimationSpeed;

    setMousePosition({
      x: currentPosition.current.x,
      y: currentPosition.current.y,
    });

    animationFrame.current = requestAnimationFrame(animate);
  }, [internalAnimationSpeed]);

  // Start/stop animation based on hover state
  useEffect(() => {
    if (
      (isHovering || isAnimatingToCenter.current) &&
      !animationFrame.current
    ) {
      isAnimationActive.current = true;
      animationFrame.current = requestAnimationFrame(animate);
    } else if (
      !isHovering &&
      !isAnimatingToCenter.current &&
      animationFrame.current
    ) {
      isAnimationActive.current = false;
      cancelAnimationFrame(animationFrame.current);
      animationFrame.current = undefined;
    }
  }, [isHovering, animate]);

  const debouncedStoreElementBounds = useRef(
    debounce((element: HTMLElement) => {
      if (element) {
        const rect = element.getBoundingClientRect();
        setBounds({
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        });
      }
    }, 100)
  );

  // Update bounds on various events
  useEffect(() => {
    const nodeEl = ref.current;
    if (!nodeEl) {
      return;
    }

    const updateBounds = () => debouncedStoreElementBounds.current(nodeEl);

    // Initial bounds calculation
    updateBounds();

    // Listen to various events that can change element position
    window.addEventListener("resize", updateBounds);
    window.addEventListener("scroll", updateBounds, { passive: true });
    window.addEventListener("orientationchange", updateBounds);

    return () => {
      window.removeEventListener("resize", updateBounds);
      window.removeEventListener("scroll", updateBounds);
      window.removeEventListener("orientationchange", updateBounds);
    };
  }, []);

  // Intersection observer for additional bounds updates
  useEffect(() => {
    const nodeEl = ref.current;
    if (!nodeEl) {
      return;
    }
    const fn = () => debouncedStoreElementBounds.current(nodeEl);
    const observer = new IntersectionObserver(fn, { threshold: 0.1 });
    observer.observe(nodeEl);
    return () => {
      observer.disconnect();
    };
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    const debouncedBounds = debouncedStoreElementBounds.current;
    return () => {
      debouncedBounds.cancel();
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
        animationFrame.current = undefined;
      }
      isAnimatingToCenter.current = false;
      isAnimationActive.current = false;
    };
  }, []);

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = event;
    // Get fresh bounds to ensure accuracy
    const freshBounds = getFreshBounds();
    if (freshBounds) {
      targetPosition.current = {
        x: clientX - freshBounds.viewportLeft,
        y: clientY - freshBounds.viewportTop,
      };
    }
  };

  const handleMouseEnter = (event: MouseEvent<HTMLElement>) => {
    // Cancel any existing animation
    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
      animationFrame.current = undefined;
    }

    isAnimatingToCenter.current = false;
    setIsHovering(true);

    const { clientX, clientY } = event;
    // Get fresh bounds to ensure accuracy
    const freshBounds = getFreshBounds();
    if (freshBounds) {
      // Update stored bounds
      setBounds({
        top: freshBounds.viewportTop,
        left: freshBounds.viewportLeft,
        width: freshBounds.width,
        height: freshBounds.height,
      });

      const targetPos = {
        x: clientX - freshBounds.viewportLeft,
        y: clientY - freshBounds.viewportTop,
      };

      // Set the target position to the cursor
      targetPosition.current = targetPos;

      // If we don't have a current position yet or if we're starting fresh,
      // start from center to ensure smooth animation
      if (currentPosition.current.x === 0 && currentPosition.current.y === 0) {
        currentPosition.current = {
          x: freshBounds.width / 2,
          y: freshBounds.height / 2,
        };
        // Set initial mouse position to center as well
        setMousePosition({
          x: freshBounds.width / 2,
          y: freshBounds.height / 2,
        });
      }

      // Start the animation to smoothly move to the target position
      isAnimationActive.current = true;
      if (!animationFrame.current) {
        animationFrame.current = requestAnimationFrame(animate);
      }
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    const freshBounds = getFreshBounds();
    if (freshBounds) {
      // Update stored bounds
      setBounds({
        top: freshBounds.viewportTop,
        left: freshBounds.viewportLeft,
        width: freshBounds.width,
        height: freshBounds.height,
      });

      // Set target to center and start animation back to center
      targetPosition.current = {
        x: freshBounds.width / 2,
        y: freshBounds.height / 2,
      };
      isAnimatingToCenter.current = true;
      isAnimationActive.current = true;
      if (!animationFrame.current) {
        animationFrame.current = requestAnimationFrame(animate);
      }
    } else {
      // Fallback if no bounds - just stop immediately
      setMousePosition(undefined);
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
        animationFrame.current = undefined;
      }
      isAnimationActive.current = false;
    }
  };

  return (
    <div
      ref={ref}
      className={classNames(
        "gradient-hover",
        isHovering && "gradient-hover--is-hovering",
        shouldAlwaysShowGradient && "gradient-hover--always-show",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ ...colorStyles, ...dynamicStyles, ...style }}
    >
      <div className="gradient-hover__content">{children}</div>
    </div>
  );
};

export default GradientHover;
