"use client";

import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type RollerItem = {
  text: string;
  color?: string;
};

export type AnimatedTextRollerProps = {
  prefix?: string;
  items: RollerItem[];
  intervalMs?: number;
  defaultColor?: string;
  forceDefaultColor?: boolean;
  className?: string;
};

/**
 * Two-line hero roller with seamless loop.
 * Fixed rem line box + overflow clip so adjacent letters (e.g. G) never bleed.
 */
const LINE_EM = 1.35;

const AnimatedTextRoller = ({
  prefix,
  items,
  intervalMs = 2200,
  defaultColor = "text-primary",
  forceDefaultColor = true,
  className,
}: AnimatedTextRollerProps) => {
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);

  const n = items.length;
  const loopItems = n > 0 ? [...items, ...items] : [];

  const step = useCallback(() => {
    if (n <= 1) return;
    setAnimate(true);
    setIndex((prev) => prev + 1);
  }, [n]);

  useEffect(() => {
    if (n <= 1) return;
    const id = setInterval(step, intervalMs);
    return () => clearInterval(id);
  }, [n, intervalMs, step]);

  useEffect(() => {
    if (n <= 1) return;
    if (index < n) return;

    const t = window.setTimeout(() => {
      setAnimate(false);
      setIndex((prev) => prev - n);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimate(true));
      });
    }, 700);

    return () => window.clearTimeout(t);
  }, [index, n]);

  if (n === 0) return null;

  return (
    <span
      className={cn(
        // Exactly two visual lines: prefix, then rotating location
        "flex w-full max-w-full flex-col items-center gap-0",
        className,
      )}
      data-hero-two-line
    >
      {prefix ? (
        <span className="block w-full max-w-5xl text-center text-white whitespace-normal text-balance break-words px-1 leading-[1.08]">
          {prefix}
        </span>
      ) : null}

      <span
        className="relative mx-auto block w-full max-w-full overflow-hidden text-center isolate"
        data-hero-location-line
        style={{
          height: `${LINE_EM}em`,
          // Hard clip + paint isolation kills descender/ascender bleed (e.g. G)
          clipPath: "inset(0 0 0 0)",
          contain: "strict",
        }}
        aria-live="polite"
        aria-atomic="true"
      >
        <span
          className={cn(
            "flex flex-col items-center will-change-transform w-full max-w-full",
            animate && "transition-transform duration-700 ease-in-out",
          )}
          style={{
            transform: `translate3d(0, calc(-${index} * ${LINE_EM}em), 0)`,
          }}
        >
          {loopItems.map((item, i) => (
            <span
              key={`${item.text}-${i}`}
              className={cn(
                "flex w-full max-w-full shrink-0 items-center justify-center px-1 overflow-hidden text-ellipsis whitespace-nowrap",
                forceDefaultColor
                  ? defaultColor
                  : (item.color ?? defaultColor),
              )}
              style={{
                height: `${LINE_EM}em`,
                lineHeight: `${LINE_EM}em`,
                maxHeight: `${LINE_EM}em`,
              }}
              aria-hidden={i % n !== index % n}
            >
              {item.text}
            </span>
          ))}
        </span>
      </span>
    </span>
  );
};

export default AnimatedTextRoller;
