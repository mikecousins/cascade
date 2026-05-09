import { useQuery } from "@tanstack/react-query";

import { getTorrents } from "@/lib/api";
import type { TorrentInfoParams } from "@/lib/api";

export function useTorrents(params: TorrentInfoParams = {}) {
  return useQuery({
    queryKey: ["torrents", params],
    queryFn: () => getTorrents(params),
    refetchInterval: 2000,
    staleTime: 1500,
    placeholderData: (prev) => prev,
  });
}
