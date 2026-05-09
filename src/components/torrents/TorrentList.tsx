import { useState } from "react";
import { Inbox } from "lucide-react";

import type { Torrent } from "@/lib/api";
import { TorrentRow } from "./TorrentRow";
import { TorrentDetailPanel } from "./TorrentDetailPanel";

export function TorrentList({ torrents }: { torrents: Torrent[] }) {
  const [selectedHash, setSelectedHash] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  if (torrents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
        <span
          aria-hidden
          className="grid size-12 place-items-center rounded-full bg-tidepool-row text-tidepool-text-subtle"
        >
          <Inbox className="size-5" strokeWidth={1.75} />
        </span>
        <div className="space-y-1">
          <p className="text-sm font-medium text-tidepool-text">No torrents yet</p>
          <p className="text-xs text-tidepool-text-muted">
            Add a torrent in qBittorrent and it'll appear here.
          </p>
        </div>
      </div>
    );
  }

  const selected =
    (selectedHash && torrents.find((t) => t.hash === selectedHash)) || null;

  const handleSelect = (hash: string) => {
    setSelectedHash(hash);
    setOpen(true);
  };

  return (
    <>
      <ul className="overflow-hidden rounded-xl border border-tidepool-divider bg-tidepool-row">
        {torrents.map((t) => (
          <TorrentRow
            key={t.hash}
            torrent={t}
            selected={selectedHash === t.hash && open}
            onSelect={() => handleSelect(t.hash)}
          />
        ))}
      </ul>
      <TorrentDetailPanel
        torrent={selected}
        open={open}
        onOpenChange={(v) => {
          setOpen(v);
          if (!v) {
            setTimeout(() => setSelectedHash(null), 250);
          }
        }}
      />
    </>
  );
}
