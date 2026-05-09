import { cn } from "@/lib/utils";
import type { StatusTone } from "./statusCopy";

const TRACK_TONE: Record<StatusTone, string> = {
  active: "bg-teal",
  complete: "bg-teal/55",
  paused: "bg-tidepool-text-muted/60",
  stalled: "bg-warning",
  error: "bg-error",
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
  thickness?: "thin" | "hair";
}) {
  const pct = Math.max(0, Math.min(1, value)) * 100;
  return (
    <div
      className={cn(
        "w-full overflow-hidden rounded-full bg-tidepool-text-muted/15",
        thickness === "hair" ? "h-0.5" : "h-1.5",
        className
      )}
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={cn(
          "h-full rounded-full transition-[width] duration-700 ease-out motion-reduce:transition-none",
          TRACK_TONE[tone]
        )}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
