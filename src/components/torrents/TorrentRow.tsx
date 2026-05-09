import { ArrowDown, ArrowUp } from "lucide-react";

import type { Torrent } from "@/lib/api";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  formatBytes,
  formatEta,
  formatPercent,
  formatRatio,
  formatSpeed,
} from "@/lib/format";
import { StatusBadge } from "./StatusBadge";
import { ProgressBar } from "./ProgressBar";

export function TorrentRow({ torrent }: { torrent: Torrent }) {
  const isComplete = torrent.progress >= 1;
  return (
    <TableRow>
      <TableCell className="max-w-0 py-3">
        <div className="flex flex-col gap-1.5">
          <span className="truncate text-sm font-medium" title={torrent.name}>
            {torrent.name}
          </span>
          <div className="flex items-center gap-2">
            <ProgressBar
              value={torrent.progress}
              tone={isComplete ? "success" : "primary"}
              className="max-w-xs"
            />
            <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
              {formatPercent(torrent.progress)}
            </span>
          </div>
        </div>
      </TableCell>
      <TableCell className="py-3">
        <StatusBadge state={torrent.state} />
      </TableCell>
      <TableCell className="py-3 text-right text-sm tabular-nums text-muted-foreground">
        {formatBytes(torrent.size)}
      </TableCell>
      <TableCell className="py-3 text-right text-sm tabular-nums">
        {torrent.dlspeed > 0 ? (
          <span className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400">
            <ArrowDown className="size-3" />
            {formatSpeed(torrent.dlspeed)}
          </span>
        ) : (
          <span className="text-muted-foreground">—</span>
        )}
      </TableCell>
      <TableCell className="py-3 text-right text-sm tabular-nums">
        {torrent.upspeed > 0 ? (
          <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
            <ArrowUp className="size-3" />
            {formatSpeed(torrent.upspeed)}
          </span>
        ) : (
          <span className="text-muted-foreground">—</span>
        )}
      </TableCell>
      <TableCell className="py-3 text-right text-sm tabular-nums text-muted-foreground">
        {formatEta(torrent.eta)}
      </TableCell>
      <TableCell className="py-3 text-right text-sm tabular-nums text-muted-foreground">
        {formatRatio(torrent.ratio)}
      </TableCell>
    </TableRow>
  );
}
