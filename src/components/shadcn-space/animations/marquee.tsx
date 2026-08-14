import { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
  duration?: string;
  gap?: string;
}

function tokenFromClass(className: string | undefined, name: string) {
  const match = className?.match(new RegExp(`\\[--${name}:([^\\]]+)\\]`));
  return match?.[1];
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  duration,
  gap,
  ...props
}: MarqueeProps) {
  const resolvedDuration =
    duration || tokenFromClass(className, "duration") || "40s";
  const resolvedGap = gap || tokenFromClass(className, "gap") || "1rem";

  return (
    <div
      {...props}
      className={cn(
        "nws-mq flex overflow-hidden p-2",
        vertical ? "flex-col" : "flex-row",
        className,
      )}
      style={{ gap: resolvedGap, ["--nws-mq-gap" as string]: resolvedGap }}
    >
      {Array.from({ length: repeat }, (_, i) => (
        <div
          key={i}
          data-nws-mq=""
          className={cn(
            "flex shrink-0 justify-around [backface-visibility:hidden]",
            vertical ? "flex-col" : "flex-row",
          )}
          style={{
            gap: resolvedGap,
            ["--nws-mq-gap" as string]: resolvedGap,
            animationName: vertical ? "nws-marquee-y" : "nws-marquee-x",
            animationDuration: resolvedDuration,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            animationDirection: reverse ? "reverse" : "normal",
            willChange: "transform",
          }}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
