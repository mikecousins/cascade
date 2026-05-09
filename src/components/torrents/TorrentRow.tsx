import {
  Archive,
  BookOpen,
  File,
  Film,
  Music,
  Package,
  Tv,
} from "lucide-react";

import type { Torrent } from "@/lib/api";
import {
  formatBytes,
  formatEta,
  formatPercent,
  formatRatio,
} from "@/lib/format";
import { cn } from "@/lib/utils";
import { detectFileKind, type FileKind } from "./fileType";
import {
  proseStatus,
  stateToTone,
  toneCopy,
  type StatusTone,
} from "./statusCopy";

const KIND_ICON: Record<FileKind, typeof Film> = {
  movie: Film,
  show: Tv,
  music: Music,
  book: BookOpen,
  archive: Archive,
  software: Package,
  other: File,
};

const RAIL_TONE: Record<StatusTone, string> = {
  active: "bg-teal",
  complete: "bg-teal/40",
  paused: "bg-tidepool-text-muted/30",
  stalled: "bg-warning",
  error: "bg-error",
};

const TONE_TEXT: Record<StatusTone, string> = {
  active: "text-teal-strong dark:text-teal",
  complete: "text-tidepool-text-muted",
  paused: "text-tidepool-text-muted",
  stalled: "text-warning",
  error: "text-error",
};

export function TorrentRow({
  torrent,
  selected,
  onSelect,
}: {
  torrent: Torrent;
  selected: boolean;
  onSelect: () => void;
}) {
  const tone = stateToTone(torrent.state);
  const Icon = KIND_ICON[detectFileKind(torrent)];
  const pct = Math.max(0, Math.min(1, torrent.progress)) * 100;

  const verb = toneCopy(torrent.state);
  const full = proseStatus(torrent);
  const tail = full.startsWith(verb) ? full.slice(verb.length) : ` ${full}`;

  return (
    <li>
      <button
        type="button"
        onClick={onSelect}
        aria-pressed={selected}
        className={cn(
          "group relative flex w-full items-start gap-4 px-4 pt-4 pb-5 text-left transition-colors duration-150 sm:px-6 sm:pt-5",
          "hover:bg-tidepool-row-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal/70 focus-visible:ring-inset",
          selected && "bg-tidepool-row-selected"
        )}
      >
        <span
          aria-hidden
          className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-lg bg-tidepool-row-hover text-tidepool-text-muted group-hover:text-tidepool-text"
        >
          <Icon className="size-4" strokeWidth={1.75} />
        </span>

        <div className="min-w-0 flex-1">
          <p
            className="line-clamp-2 text-[15px] font-medium leading-snug text-tidepool-text"
            title={torrent.name}
          >
            {torrent.name}
          </p>
          <p className="mt-1.5 line-clamp-1 text-xs text-tidepool-text-muted">
            <span className={cn("font-medium", TONE_TEXT[tone])}>{verb}</span>
            <span>{tail}</span>
          </p>
        </div>

        <div className="shrink-0 text-right tabular-nums">
          <div className="text-lg font-semibold leading-none text-tidepool-text">
            {formatPercent(torrent.progress)}
          </div>
          <div className="mt-1.5 text-xs text-tidepool-text-muted">
            {torrent.dlspeed > 0
              ? formatEta(torrent.eta)
              : tone === "complete"
                ? `${formatRatio(torrent.ratio)} ratio`
                : formatBytes(torrent.size)}
          </div>
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-tidepool-divider"
        >
          <div
            className={cn(
              "h-full transition-[width] duration-700 ease-out motion-reduce:transition-none",
              RAIL_TONE[tone]
            )}
            style={{ width: `${pct}%` }}
          />
        </div>
      </button>
    </li>
  );
}
