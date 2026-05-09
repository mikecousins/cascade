import { createFileRoute } from "@tanstack/react-router";

import { useTorrents } from "@/hooks/useTorrents";
import { TorrentList } from "@/components/torrents/TorrentList";
import { TorrentListSkeleton } from "@/components/torrents/TorrentListSkeleton";

export const Route = createFileRoute("/_authed/torrents")({
  component: TorrentsPage,
});

function TorrentsPage() {
  const { data, isLoading, isError, error } = useTorrents({
    sort: "added_on",
    reverse: true,
  });

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Torrents</h1>
          <p className="text-sm text-muted-foreground">
            {data ? `${data.length} torrent${data.length === 1 ? "" : "s"}` : "Loading…"}
          </p>
        </div>
      </header>

      {isLoading && !data && <TorrentListSkeleton />}
      {isError && (
        <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
          {error instanceof Error ? error.message : "Failed to load torrents."}
        </div>
      )}
      {data && <TorrentList torrents={data} />}
    </div>
  );
}
