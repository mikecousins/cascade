import { ArrowDown, ArrowUp } from "lucide-react";

import type { Torrent } from "@/lib/api";
import { Card } from "@/components/ui/card";
import {
  formatBytes,
  formatEta,
  formatPercent,
  formatRatio,
  formatSpeed,
} from "@/lib/format";
import { StatusBadge } from "./StatusBadge";
import { ProgressBar } from "./ProgressBar";

export function TorrentCard({ torrent }: { torrent: Torrent }) {
  const isComplete = torrent.progress >= 1;
  return (
    <Card className="gap-3 px-4 py-3">
      <div className="flex items-start justify-between gap-3">
        <span className="line-clamp-2 text-sm font-medium leading-snug" title={torrent.name}>
          {torrent.name}
        </span>
        <StatusBadge state={torrent.state} className="shrink-0" />
      </div>
      <div className="flex items-center gap-2">
        <ProgressBar
          value={torrent.progress}
          tone={isComplete ? "success" : "primary"}
          className="flex-1"
        />
        <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
          {formatPercent(torrent.progress)}
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs tabular-nums text-muted-foreground">
        <span>{formatBytes(torrent.size)}</span>
        {torrent.dlspeed > 0 && (
          <span className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400">
            <ArrowDown className="size-3" />
            {formatSpeed(torrent.dlspeed)}
          </span>
        )}
        {torrent.upspeed > 0 && (
          <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
            <ArrowUp className="size-3" />
            {formatSpeed(torrent.upspeed)}
          </span>
        )}
        <span className="ml-auto">ETA {formatEta(torrent.eta)}</span>
        <span>Ratio {formatRatio(torrent.ratio)}</span>
      </div>
    </Card>
  );
}
