import { cn } from "@/lib/utils";
import type { TorrentState } from "@/lib/api";

type Tone =
  | "downloading"
  | "seeding"
  | "paused"
  | "stalled"
  | "queued"
  | "checking"
  | "moving"
  | "error"
  | "unknown";

const TONES: Record<Tone, { label: string; className: string }> = {
  downloading: {
    label: "Downloading",
    className: "bg-blue-500/15 text-blue-500 dark:text-blue-400",
  },
  seeding: {
    label: "Seeding",
    className: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  },
  paused: {
    label: "Paused",
    className: "bg-zinc-500/15 text-zinc-600 dark:text-zinc-300",
  },
  stalled: {
    label: "Stalled",
    className: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  },
  queued: {
    label: "Queued",
    className: "bg-violet-500/15 text-violet-600 dark:text-violet-400",
  },
  checking: {
    label: "Checking",
    className: "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400",
  },
  moving: {
    label: "Moving",
    className: "bg-fuchsia-500/15 text-fuchsia-600 dark:text-fuchsia-400",
  },
  error: {
    label: "Error",
    className: "bg-destructive/15 text-destructive",
  },
  unknown: {
    label: "Unknown",
    className: "bg-muted text-muted-foreground",
  },
};

const STATE_TO_TONE: Record<TorrentState, Tone> = {
  downloading: "downloading",
  metaDL: "downloading",
  forcedDL: "downloading",
  allocating: "downloading",
  uploading: "seeding",
  forcedUP: "seeding",
  pausedUP: "paused",
  pausedDL: "paused",
  stoppedUP: "paused",
  stoppedDL: "paused",
  queuedUP: "queued",
  queuedDL: "queued",
  stalledUP: "stalled",
  stalledDL: "stalled",
  checkingUP: "checking",
  checkingDL: "checking",
  checkingResumeData: "checking",
  moving: "moving",
  error: "error",
  missingFiles: "error",
  unknown: "unknown",
};

export function StatusBadge({
  state,
  className,
}: {
  state: TorrentState;
  className?: string;
}) {
  const tone = STATE_TO_TONE[state] ?? "unknown";
  const { label, className: toneClass } = TONES[tone];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium",
        toneClass,
        className
      )}
    >
      {label}
    </span>
  );
}
