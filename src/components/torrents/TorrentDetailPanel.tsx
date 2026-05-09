import { Dialog } from "radix-ui";
import { ArrowDown, ArrowUp, Info, X } from "lucide-react";

import type { Torrent } from "@/lib/api";
import {
  formatBytes,
  formatEta,
  formatPercent,
  formatRatio,
  formatRelativeTime,
  formatSpeed,
} from "@/lib/format";
import { cn } from "@/lib/utils";
import { ProgressBar } from "./ProgressBar";
import { StatusBadge } from "./StatusBadge";
import { stateToTone } from "./statusCopy";

function FactRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2 border-b border-tidepool-divider/60 last:border-b-0">
      <span className="text-xs uppercase tracking-[0.06em] text-tidepool-text-subtle">
        {label}
      </span>
      <span className="text-sm tabular-nums text-tidepool-text">{value}</span>
    </div>
  );
}

export function TorrentDetailPanel({
  torrent,
  open,
  onOpenChange,
}: {
  torrent: Torrent | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          className={cn(
            "fixed inset-0 z-50 bg-tidepool-canvas/60 backdrop-blur-[2px]",
            "data-[state=open]:animate-in data-[state=open]:fade-in-0",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
            "motion-reduce:animate-none"
          )}
        />
        <Dialog.Content
          aria-describedby={undefined}
          className={cn(
            "fixed z-50 flex flex-col bg-tidepool-row text-tidepool-text shadow-[0_-12px_40px_-12px_oklch(0_0_0/0.5)]",
            // Mobile: bottom sheet
            "inset-x-0 bottom-0 max-h-[85vh] rounded-t-2xl",
            "data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom",
            "data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom",
            // Desktop: right side panel
            "md:inset-y-0 md:right-0 md:bottom-auto md:left-auto md:h-full md:w-[420px] md:max-h-none md:rounded-none md:rounded-l-2xl md:border-l md:border-tidepool-divider",
            "md:data-[state=open]:slide-in-from-right md:data-[state=open]:slide-in-from-bottom-0",
            "md:data-[state=closed]:slide-out-to-right md:data-[state=closed]:slide-out-to-bottom-0",
            "motion-reduce:animate-none"
          )}
        >
          {/* Mobile drag indicator */}
          <div
            aria-hidden
            className="mx-auto mt-2 h-1 w-10 shrink-0 rounded-full bg-tidepool-divider md:hidden"
          />

          <div className="flex items-start justify-between gap-3 px-5 pt-5 pb-3 md:px-6 md:pt-6">
            <div className="min-w-0 flex-1">
              <Dialog.Title className="line-clamp-2 break-all text-base font-semibold leading-snug text-tidepool-text">
                {torrent ? torrent.name : "Torrent"}
              </Dialog.Title>
              {torrent && (
                <div className="mt-2 flex items-center gap-2">
                  <StatusBadge state={torrent.state} />
                  <span className="text-xs text-tidepool-text-muted">
                    Added {formatRelativeTime(torrent.added_on)}
                  </span>
                </div>
              )}
            </div>
            <Dialog.Close
              className="grid size-9 shrink-0 place-items-center rounded-md text-tidepool-text-muted transition-colors hover:bg-tidepool-row-hover hover:text-tidepool-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal/70"
              aria-label="Close"
            >
              <X className="size-4" />
            </Dialog.Close>
          </div>

          {torrent ? (
            <div className="flex-1 overflow-y-auto px-5 pb-6 md:px-6">
              <div className="mt-4 flex items-center gap-3">
                <ProgressBar
                  value={torrent.progress}
                  tone={stateToTone(torrent.state)}
                  className="flex-1"
                />
                <span className="shrink-0 text-sm font-semibold tabular-nums text-tidepool-text">
                  {formatPercent(torrent.progress)}
                </span>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-tidepool-row-hover/60 p-3">
                  <div className="flex items-center gap-1.5 text-xs uppercase tracking-[0.06em] text-tidepool-text-subtle">
                    <ArrowDown className="size-3" aria-hidden />
                    Down
                  </div>
                  <div
                    className={cn(
                      "mt-1 text-base font-semibold tabular-nums",
                      torrent.dlspeed > 0
                        ? "text-teal-strong dark:text-teal"
                        : "text-tidepool-text-muted"
                    )}
                  >
                    {torrent.dlspeed > 0 ? formatSpeed(torrent.dlspeed) : "—"}
                  </div>
                </div>
                <div className="rounded-lg bg-tidepool-row-hover/60 p-3">
                  <div className="flex items-center gap-1.5 text-xs uppercase tracking-[0.06em] text-tidepool-text-subtle">
                    <ArrowUp className="size-3" aria-hidden />
                    Up
                  </div>
                  <div
                    className={cn(
                      "mt-1 text-base font-semibold tabular-nums",
                      torrent.upspeed > 0
                        ? "text-tidepool-text"
                        : "text-tidepool-text-muted"
                    )}
                  >
                    {torrent.upspeed > 0 ? formatSpeed(torrent.upspeed) : "—"}
                  </div>
                </div>
              </div>

              <div className="mt-5 px-1">
                <FactRow label="Size" value={formatBytes(torrent.size)} />
                <FactRow
                  label="Downloaded"
                  value={formatBytes(torrent.downloaded)}
                />
                <FactRow
                  label="Uploaded"
                  value={formatBytes(torrent.uploaded)}
                />
                <FactRow label="Ratio" value={formatRatio(torrent.ratio)} />
                <FactRow label="ETA" value={formatEta(torrent.eta)} />
                <FactRow
                  label="Peers"
                  value={`${torrent.num_leechs} of ${torrent.num_incomplete}`}
                />
                <FactRow
                  label="Seeders"
                  value={`${torrent.num_seeds} of ${torrent.num_complete}`}
                />
                {torrent.category && (
                  <FactRow label="Category" value={torrent.category} />
                )}
              </div>

              <div className="mt-6 flex items-start gap-2 rounded-lg border border-tidepool-divider bg-tidepool-row-hover/40 p-3 text-xs text-tidepool-text-muted">
                <Info className="size-3.5 shrink-0 mt-0.5" aria-hidden />
                <p>
                  Files, peers, and trackers ship in a follow-up. Actions
                  (pause, resume, delete) come with the next phase.
                </p>
              </div>
            </div>
          ) : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
