import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";
import type { StatusTone } from "./statusCopy";

const SEGMENT_COUNT = 24;
const SEGMENT_GAP_PX = 3;

const SEGMENT_MASK = `repeating-linear-gradient(to right, black 0, black calc(100% / ${SEGMENT_COUNT} - ${SEGMENT_GAP_PX}px), transparent calc(100% / ${SEGMENT_COUNT} - ${SEGMENT_GAP_PX}px), transparent calc(100% / ${SEGMENT_COUNT}))`;

const LIT_TONE: Record<StatusTone, string> = {
  active: "bg-teal",
  complete: "bg-teal/55",
  paused: "bg-tidepool-text-muted/60",
  stalled: "bg-warning",
  error: "bg-error",
};

const DIM_TONE: Record<StatusTone, string> = {
  active: "bg-teal/15",
  complete: "bg-teal/10",
  paused: "bg-tidepool-text-muted/15",
  stalled: "bg-warning/15",
  error: "bg-error/15",
};

const GLOW_TONE: Record<StatusTone, string> = {
  active: "drop-shadow-[0_0_2px_var(--teal-glow)]",
  complete: "drop-shadow-[0_0_2px_var(--teal-glow)]",
  paused: "",
  stalled: "",
  error: "",
};

const RAIL_GLOW_TONE: Record<StatusTone, string> = {
  active: "drop-shadow-[0_0_1px_var(--teal-glow)]",
  complete: "drop-shadow-[0_0_1px_var(--teal-glow)]",
  paused: "",
  stalled: "",
  error: "",
};

export function ProgressBar({
  value,
  className,
  tone = "active",
  thickness = "thin",
}: {
  value: number;
  className?: string;
  tone?: StatusTone;
  thickness?: "thin" | "rail";
}) {
  const clamped = Math.max(0, Math.min(1, value));
  const pct = clamped * 100;
  const litSegments = Math.floor(clamped * SEGMENT_COUNT);
  const litPct = (litSegments / SEGMENT_COUNT) * 100;

  const maskStyle: CSSProperties = {
    WebkitMaskImage: SEGMENT_MASK,
    maskImage: SEGMENT_MASK,
  };
  const glow = thickness === "rail" ? RAIL_GLOW_TONE[tone] : GLOW_TONE[tone];

  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn(
        "relative w-full",
        thickness === "rail" ? "h-0.5" : "h-1.5",
        className
      )}
    >
      <div
        aria-hidden
        className={cn("absolute inset-0", DIM_TONE[tone])}
        style={maskStyle}
      />
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 transition-[clip-path] duration-700 ease-out motion-reduce:transition-none",
          LIT_TONE[tone],
          glow
        )}
        style={{
          ...maskStyle,
          clipPath: `inset(0 ${100 - litPct}% 0 0)`,
        }}
      />
    </div>
  );
}
