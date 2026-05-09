// Types for qBittorrent Web API v2.
// See: https://github.com/qbittorrent/qBittorrent/wiki/WebUI-API-(qBittorrent-4.1)

export type TorrentState =
  | "error"
  | "missingFiles"
  | "uploading"
  | "pausedUP"
  | "queuedUP"
  | "stalledUP"
  | "checkingUP"
  | "forcedUP"
  | "allocating"
  | "downloading"
  | "metaDL"
  | "pausedDL"
  | "queuedDL"
  | "stalledDL"
  | "checkingDL"
  | "forcedDL"
  | "checkingResumeData"
  | "moving"
  | "unknown"
  // qBittorrent >= 5.0 renamed `pausedXX` to `stoppedXX`
  | "stoppedUP"
  | "stoppedDL";

export interface Torrent {
  hash: string;
  name: string;
  size: number;
  total_size: number;
  progress: number;
  dlspeed: number;
  upspeed: number;
  eta: number;
  ratio: number;
  state: TorrentState;
  category: string;
  tags: string;
  added_on: number;
  completion_on: number;
  save_path: string;
  content_path: string;
  num_seeds: number;
  num_complete: number;
  num_leechs: number;
  num_incomplete: number;
  priority: number;
  amount_left: number;
  downloaded: number;
  uploaded: number;
  availability: number;
  tracker: string;
  magnet_uri: string;
  seq_dl: boolean;
  f_l_piece_prio: boolean;
  force_start: boolean;
  super_seeding: boolean;
  auto_tmm: boolean;
}

export interface TorrentInfoParams {
  filter?:
    | "all"
    | "downloading"
    | "completed"
    | "paused"
    | "stopped"
    | "active"
    | "inactive"
    | "resumed"
    | "running"
    | "stalled"
    | "stalled_uploading"
    | "stalled_downloading"
    | "errored";
  category?: string;
  tag?: string;
  sort?: keyof Torrent;
  reverse?: boolean;
  limit?: number;
  offset?: number;
  hashes?: string[];
}

export interface LoginCredentials {
  username: string;
  password: string;
}
