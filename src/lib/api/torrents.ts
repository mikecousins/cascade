import { qbitJson } from "./client";
import type { Torrent, TorrentInfoParams } from "./types";

export async function getTorrents(
  params: TorrentInfoParams = {}
): Promise<Torrent[]> {
  const search = new URLSearchParams();
  if (params.filter) search.set("filter", params.filter);
  if (params.category !== undefined) search.set("category", params.category);
  if (params.tag !== undefined) search.set("tag", params.tag);
  if (params.sort) search.set("sort", String(params.sort));
  if (params.reverse !== undefined) search.set("reverse", String(params.reverse));
  if (params.limit !== undefined) search.set("limit", String(params.limit));
  if (params.offset !== undefined) search.set("offset", String(params.offset));
  if (params.hashes && params.hashes.length > 0) {
    search.set("hashes", params.hashes.join("|"));
  }

  const query = search.toString();
  const path = `/torrents/info${query ? `?${query}` : ""}`;
  return qbitJson<Torrent[]>(path);
}
