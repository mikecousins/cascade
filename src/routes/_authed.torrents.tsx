import { createFileRoute } from "@tanstack/react-router";
import { AlertCircle } from "lucide-react";

import { useTorrents } from "@/hooks/useTorrents";
import { TorrentList } from "@/components/torrents/TorrentList";
import { TorrentListSkeleton } from "@/components/torrents/TorrentListSkeleton";
import { SummaryStrip } from "@/components/torrents/SummaryStrip";

export const Route = createFileRoute("/_authed/torrents")({
  component: TorrentsPage,
});

function TorrentsPage() {
  const { data, isLoading, isError, error } = useTorrents({
    sort: "added_on",
    reverse: true,
  });

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:py-8 lg:px-8">
      <header className="pb-5">
        <h1 className="text-[26px] font-semibold tracking-tight text-tidepool-text sm:text-3xl">
          Torrents
        </h1>
        <p className="mt-1 text-sm text-tidepool-text-muted">
          {data
            ? data.length === 0
              ? "Your library is empty."
              : `${data.length} torrent${data.length === 1 ? "" : "s"} in your library.`
            : "Loading your library…"}
        </p>
      </header>

      {data && data.length > 0 && (
        <div className="mb-6">
          <SummaryStrip torrents={data} />
        </div>
      )}

      {isLoading && !data && <TorrentListSkeleton />}

      {isError && (
        <div className="flex items-start gap-3 rounded-xl border border-error/40 bg-error-soft px-4 py-3 text-sm text-error-fg">
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
          <div>
            <p className="font-medium">Couldn't reach qBittorrent.</p>
            <p className="mt-0.5 text-error-fg/80">
              {error instanceof Error
                ? error.message
                : "We'll keep trying. Check that qBittorrent is running."}
            </p>
          </div>
        </div>
      )}

      {data && <TorrentList torrents={data} />}
    </div>
  );
}
