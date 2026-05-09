import { cn } from "@/lib/utils";

export function TorrentListSkeleton() {
  const rows = Array.from({ length: 6 });
  return (
    <ul className="overflow-hidden rounded-xl border border-tidepool-divider bg-tidepool-row">
      {rows.map((_, i) => (
        <li
          key={i}
          className={cn(
            "flex items-start gap-4 px-6 pt-5 pb-5",
            i < rows.length - 1 && "border-b border-tidepool-divider/70"
          )}
        >
          <div className="size-9 shrink-0 animate-pulse rounded-lg bg-tidepool-row-hover" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-2/3 animate-pulse rounded bg-tidepool-row-hover" />
            <div className="h-2.5 w-1/2 animate-pulse rounded bg-tidepool-row-hover/70" />
          </div>
          <div className="space-y-2 text-right">
            <div className="ml-auto h-3.5 w-12 animate-pulse rounded bg-tidepool-row-hover" />
            <div className="ml-auto h-2.5 w-10 animate-pulse rounded bg-tidepool-row-hover/70" />
          </div>
        </li>
      ))}
    </ul>
  );
}
