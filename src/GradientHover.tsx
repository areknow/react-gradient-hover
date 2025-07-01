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
  animationSpeed = 0.01,
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

  const [stop1, stop2] = colors;

  const colorStyles = {
    "--gradient-stop-1": stop1,
    "--gradient-stop-2": stop2,
    "--transition-duration": `${transitionDuration}s`,
  } as CSSProperties;

  let dynamicStyles = {};
  if (mousePosition && bounds) {
    dynamicStyles = {
      "--gradient-x": `${Math.round((mousePosition.x / bounds.width) * 100)}%`,
      "--gradient-y": `${Math.round((mousePosition.y / bounds.height) * 100)}%`,
    } as CSSProperties;
  }

  // Continuous animation function - runs while hovering or animating to center
  const animate = useCallback(() => {
    if (!isHovering && !isAnimatingToCenter.current) {
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
      setMousePosition(undefined);
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
        animationFrame.current = undefined;
      }
      return;
    }

    currentPosition.current.x += distX * animationSpeed;
    currentPosition.current.y += distY * animationSpeed;

    setMousePosition({
      x: currentPosition.current.x,
      y: currentPosition.current.y,
    });

    animationFrame.current = requestAnimationFrame(animate);
  }, [isHovering, animationSpeed]);

  // Start/stop animation based on hover state
  useEffect(() => {
    if (
      (isHovering || isAnimatingToCenter.current) &&
      !animationFrame.current
    ) {
      animationFrame.current = requestAnimationFrame(animate);
    } else if (
      !isHovering &&
      !isAnimatingToCenter.current &&
      animationFrame.current
    ) {
      cancelAnimationFrame(animationFrame.current);
      animationFrame.current = undefined;
    }
  }, [isHovering, animate]);

  const debouncedStoreElementBounds = useRef(
    debounce((element: HTMLElement) => {
      if (element) {
        const { top, left, width, height } = element.getBoundingClientRect();
        setBounds({ top, left, width, height });
      }
    }, 100)
  );

  // Recalculate bounds when window resizes
  useEffect(() => {
    const nodeEl = ref.current;
    if (!nodeEl) {
      return;
    }
    const fn = () => debouncedStoreElementBounds.current(nodeEl);
    window.addEventListener("resize", fn);
    return () => {
      window.removeEventListener("resize", fn);
    };
  }, []);

  // Recalculate bounds when element is observed
  useEffect(() => {
    const nodeEl = ref.current;
    if (!nodeEl) {
      return;
    }
    const fn = () => debouncedStoreElementBounds.current(nodeEl);
    const observer = new IntersectionObserver(fn);
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
      }
      isAnimatingToCenter.current = false;
    };
  }, []);

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = event;
    if (bounds) {
      targetPosition.current = {
        x: clientX - bounds.left,
        y: clientY - bounds.top,
      };
    }
  };

  const handleMouseEnter = (event: MouseEvent<HTMLElement>) => {
    setIsHovering(true);
    const { clientX, clientY } = event;
    if (bounds) {
      const initialPos = {
        x: clientX - bounds.left,
        y: clientY - bounds.top,
      };
      targetPosition.current = initialPos;
      currentPosition.current = initialPos;
      setMousePosition(initialPos);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (bounds) {
      // Set target to center and start animation back to center
      targetPosition.current = {
        x: bounds.width / 2,
        y: bounds.height / 2,
      };
      isAnimatingToCenter.current = true;
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
