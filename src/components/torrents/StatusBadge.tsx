import { cn } from "@/lib/utils";
import type { TorrentState } from "@/lib/api";
import { stateToTone, toneCopy, type StatusTone } from "./statusCopy";

const TONE_STYLES: Record<StatusTone, string> = {
  active:
    "bg-[oklch(from_var(--teal)_l_c_h_/_0.18)] text-teal",
  complete:
    "bg-[oklch(from_var(--teal)_l_c_h_/_0.10)] text-teal-strong dark:text-teal",
  paused:
    "bg-[oklch(from_var(--tidepool-text-muted)_l_c_h_/_0.12)] text-tidepool-text-muted",
  stalled: "bg-warning-soft text-warning-fg",
  error: "bg-error-soft text-error-fg",
};

export function StatusBadge({
  state,
  className,
}: {
  state: TorrentState;
  className?: string;
}) {
  const tone = stateToTone(state);
  const label = toneCopy(state);
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium tracking-tight",
        TONE_STYLES[tone],
        className
      )}
    >
      {label}
    </span>
  );
}
