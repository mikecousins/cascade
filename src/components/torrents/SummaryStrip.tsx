import { useMemo } from "react";

import type { Torrent } from "@/lib/api";
import { formatSpeed } from "@/lib/format";
import { cn } from "@/lib/utils";
import { stateToTone, isComplete } from "./statusCopy";

type Tone = "default" | "active" | "warning";

function Stat({
  label,
  value,
  detail,
  tone = "default",
}: {
  label: string;
  value: string;
  detail?: string;
  tone?: Tone;
}) {
  return (
    <div className="flex min-w-0 shrink-0 flex-col gap-1.5 px-5 py-4 sm:flex-1 sm:px-6 sm:py-5">
      <span className="text-[11px] font-medium uppercase tracking-[0.06em] text-tidepool-text-subtle">
        {label}
      </span>
      <span
        className={cn(
          "flex items-baseline gap-1.5 text-[28px] font-semibold leading-none tabular-nums tracking-tight sm:text-[32px]",
          tone === "active" && "text-teal",
          tone === "warning" && "text-warning",
          tone === "default" && "text-tidepool-text"
        )}
      >
        {value}
        {detail ? (
          <span className="text-sm font-normal text-tidepool-text-subtle">
            {detail}
          </span>
        ) : null}
      </span>
    </div>
  );
}

export function SummaryStrip({ torrents }: { torrents: Torrent[] }) {
  const stats = useMemo(() => {
    let active = 0;
    let stuck = 0;
    let dlSum = 0;
    let upSum = 0;

    for (const t of torrents) {
      if (t.dlspeed > 0 || t.upspeed > 0) active += 1;
      const tone = stateToTone(t.state);
      if (tone === "stalled" || tone === "error") stuck += 1;
      dlSum += t.dlspeed;
      upSum += t.upspeed;
    }

    const completed = torrents.reduce(
      (acc, t) => acc + (isComplete(t) ? 1 : 0),
      0
    );

    return {
      active,
      total: torrents.length,
      completed,
      stuck,
      dlSum,
      upSum,
    };
  }, [torrents]);

  return (
    <section
      aria-label="Library summary"
      className="-mx-4 flex snap-x snap-mandatory items-stretch divide-x divide-tidepool-divider overflow-x-auto border-y border-tidepool-divider bg-tidepool-row [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:rounded-xl sm:border"
    >
      <Stat
        label="Active"
        value={stats.active.toString()}
        detail={`of ${stats.total}`}
        tone={stats.active > 0 ? "active" : "default"}
      />
      <Stat
        label="↓ Down"
        value={stats.dlSum > 0 ? formatSpeed(stats.dlSum) : "0 B/s"}
        tone={stats.dlSum > 0 ? "active" : "default"}
      />
      <Stat
        label="↑ Up"
        value={stats.upSum > 0 ? formatSpeed(stats.upSum) : "0 B/s"}
        tone={stats.upSum > 0 ? "active" : "default"}
      />
      {stats.stuck > 0 && (
        <Stat label="Stuck" value={stats.stuck.toString()} tone="warning" />
      )}
    </section>
  );
}
