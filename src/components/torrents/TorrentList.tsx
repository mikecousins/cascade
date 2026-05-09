import { Inbox } from "lucide-react";

import type { Torrent } from "@/lib/api";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TorrentCard } from "./TorrentCard";
import { TorrentRow } from "./TorrentRow";

export function TorrentList({ torrents }: { torrents: Torrent[] }) {
  if (torrents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border py-16 text-center">
        <Inbox className="size-8 text-muted-foreground/60" />
        <div>
          <p className="text-sm font-medium">No torrents yet</p>
          <p className="text-xs text-muted-foreground">
            Add a torrent in qBittorrent and it will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Mobile: card list */}
      <div className="flex flex-col gap-2 md:hidden">
        {torrents.map((t) => (
          <TorrentCard key={t.hash} torrent={t} />
        ))}
      </div>

      {/* Desktop: table */}
      <div className="hidden overflow-hidden rounded-xl border border-border md:block">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead className="w-[44%]">Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Size</TableHead>
              <TableHead className="text-right">↓</TableHead>
              <TableHead className="text-right">↑</TableHead>
              <TableHead className="text-right">ETA</TableHead>
              <TableHead className="text-right">Ratio</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {torrents.map((t) => (
              <TorrentRow key={t.hash} torrent={t} />
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
