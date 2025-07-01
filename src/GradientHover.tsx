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

const DEFAULT_COLORS = ["#EB2DD2", "#5AB5EE"];

const GradientHover: React.FC<GradientHoverProps> = ({
  colors = DEFAULT_COLORS,
  children,
  className = "",
  style = {},
  onClick,
  animationSpeed = 5,
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

  // Animation state
  const targetPosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const currentPosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const animationFrame = useRef<number | undefined>(undefined);
  const isAnimatingToCenter = useRef(false);
  const isAnimationActive = useRef(false);
  const lastTime = useRef<number>(0);

  // Ensure we have at least 2 colors for the gradient
  const validColors = colors && colors.length >= 2 ? colors : DEFAULT_COLORS;

  // Calculate smoothing speed using an exponential curve
  // This gives us a nice progression from very slow to fast
  const smoothingSpeed = 0.00025 * Math.pow(animationSpeed, 1.3);

  // Generate gradient string
  const generateGradient = (x: string, y: string) => {
    return `radial-gradient(circle at ${x} ${y}, ${validColors.join(", ")})`;
  };

  // CSS variables for gradient
  const colorStyles = {
    "--gradient-colors": validColors.join(", "),
    "--gradient-stop-last": validColors[validColors.length - 1],
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

  // Get fresh bounds for accurate positioning
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

  // Animation loop using exponential smoothing
  const animate = useCallback(
    (currentTime: number) => {
      if (!isAnimationActive.current) {
        return;
      }

      // Calculate delta time for frame-independent animation
      const deltaTime = lastTime.current
        ? Math.min((currentTime - lastTime.current) / 16.67, 2)
        : 1;
      lastTime.current = currentTime;

      const distX = targetPosition.current.x - currentPosition.current.x;
      const distY = targetPosition.current.y - currentPosition.current.y;
      const distance = Math.sqrt(distX * distX + distY * distY);

      // Stop animating when close to center
      if (distance < 0.5 && isAnimatingToCenter.current) {
        isAnimatingToCenter.current = false;
        isAnimationActive.current = false;
        setMousePosition(undefined);
        if (animationFrame.current) {
          cancelAnimationFrame(animationFrame.current);
          animationFrame.current = undefined;
        }
        return;
      }

      // Use faster speed when returning to center
      const effectiveSpeed = isAnimatingToCenter.current
        ? Math.max(smoothingSpeed * 3, 0.003)
        : smoothingSpeed;

      const smoothingFactor = 1 - Math.pow(1 - effectiveSpeed * 10, deltaTime);

      // Move toward target by a fraction of the distance
      currentPosition.current.x += distX * smoothingFactor;
      currentPosition.current.y += distY * smoothingFactor;

      setMousePosition({
        x: currentPosition.current.x,
        y: currentPosition.current.y,
      });

      animationFrame.current = requestAnimationFrame(animate);
    },
    [smoothingSpeed, isAnimatingToCenter]
  );

  // Start/stop animation based on hover state
  useEffect(() => {
    if (
      (isHovering || isAnimatingToCenter.current) &&
      !animationFrame.current
    ) {
      isAnimationActive.current = true;
      lastTime.current = 0;
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

  // Debounced bounds updater
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

  // Update bounds on resize/scroll
  useEffect(() => {
    const nodeEl = ref.current;
    if (!nodeEl) return;

    const updateBounds = () => debouncedStoreElementBounds.current(nodeEl);

    updateBounds();

    window.addEventListener("resize", updateBounds);
    window.addEventListener("scroll", updateBounds, { passive: true });
    window.addEventListener("orientationchange", updateBounds);

    return () => {
      window.removeEventListener("resize", updateBounds);
      window.removeEventListener("scroll", updateBounds);
      window.removeEventListener("orientationchange", updateBounds);
    };
  }, []);

  // Intersection observer for visibility changes
  useEffect(() => {
    const nodeEl = ref.current;
    if (!nodeEl) return;

    const fn = () => debouncedStoreElementBounds.current(nodeEl);
    const observer = new IntersectionObserver(fn, { threshold: 0.1 });
    observer.observe(nodeEl);

    return () => observer.disconnect();
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
    const freshBounds = getFreshBounds();
    if (freshBounds) {
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

      targetPosition.current = targetPos;

      // Start from center if no current position
      if (currentPosition.current.x === 0 && currentPosition.current.y === 0) {
        currentPosition.current = {
          x: freshBounds.width / 2,
          y: freshBounds.height / 2,
        };
        setMousePosition({
          x: freshBounds.width / 2,
          y: freshBounds.height / 2,
        });
      }

      isAnimationActive.current = true;
      lastTime.current = 0;
      if (!animationFrame.current) {
        animationFrame.current = requestAnimationFrame(animate);
      }
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    const freshBounds = getFreshBounds();
    if (freshBounds) {
      setBounds({
        top: freshBounds.viewportTop,
        left: freshBounds.viewportLeft,
        width: freshBounds.width,
        height: freshBounds.height,
      });

      // Animate back to center
      targetPosition.current = {
        x: freshBounds.width / 2,
        y: freshBounds.height / 2,
      };
      isAnimatingToCenter.current = true;
      isAnimationActive.current = true;
      lastTime.current = 0;

      if (!animationFrame.current) {
        animationFrame.current = requestAnimationFrame(animate);
      }
    } else {
      // Fallback - stop immediately
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
