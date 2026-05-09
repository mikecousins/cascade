import type { Torrent, TorrentState } from "@/lib/api";
import { formatEta, formatRatio, formatSpeed } from "@/lib/format";

export type StatusTone = "active" | "complete" | "paused" | "stalled" | "error";

const TONE_BY_STATE: Record<TorrentState, StatusTone> = {
  downloading: "active",
  metaDL: "active",
  forcedDL: "active",
  allocating: "active",
  uploading: "active",
  forcedUP: "active",
  pausedUP: "complete",
  pausedDL: "paused",
  stoppedUP: "complete",
  stoppedDL: "paused",
  queuedUP: "paused",
  queuedDL: "paused",
  stalledUP: "stalled",
  stalledDL: "stalled",
  checkingUP: "paused",
  checkingDL: "paused",
  checkingResumeData: "paused",
  moving: "paused",
  error: "error",
  missingFiles: "error",
  unknown: "paused",
};

const COPY_BY_STATE: Record<TorrentState, string> = {
  downloading: "Downloading",
  metaDL: "Fetching metadata",
  forcedDL: "Downloading",
  allocating: "Allocating",
  uploading: "Seeding",
  forcedUP: "Seeding",
  pausedUP: "Completed",
  pausedDL: "Paused",
  stoppedUP: "Completed",
  stoppedDL: "Paused",
  queuedUP: "Queued",
  queuedDL: "Queued",
  stalledUP: "Stalled",
  stalledDL: "Stalled",
  checkingUP: "Checking",
  checkingDL: "Checking",
  checkingResumeData: "Checking",
  moving: "Moving files",
  error: "Error",
  missingFiles: "Missing files",
  unknown: "Unknown",
};

export function stateToTone(state: TorrentState): StatusTone {
  return TONE_BY_STATE[state] ?? "paused";
}

export function toneCopy(state: TorrentState): string {
  return COPY_BY_STATE[state] ?? "Unknown";
}

/** Whether the torrent is making progress (download or upload). */
export function isActive(t: Torrent): boolean {
  return t.dlspeed > 0 || t.upspeed > 0;
}

export function isComplete(t: Torrent): boolean {
  return t.progress >= 1;
}

/** Detail half of the status: secondary information after the state word. */
export function proseDetail(t: Torrent): string | null {
  const tone = stateToTone(t.state);
  const peers = t.num_leechs;
  const swarm = t.num_incomplete;
  const seeds = t.num_seeds;
  const seedSwarm = t.num_complete;

  if (tone === "stalled") {
    if (isComplete(t)) {
      return seedSwarm > 0 ? `last seen ${seedSwarm} seeders` : null;
    }
    return swarm > 0 ? `${peers} of ${swarm} peers connected` : "no peers";
  }
  if (tone === "error") {
    return t.state === "missingFiles" ? "files missing on disk" : "check qBittorrent logs";
  }
  if (tone === "paused") {
    if (t.state === "queuedDL" || t.state === "queuedUP") return null;
    if (t.state.startsWith("checking")) return "verifying files";
    if (t.state === "moving") return "moving files";
    return `paused at ${(t.progress * 100).toFixed(0)}%`;
  }
  if (tone === "complete") {
    if (seeds > 0) {
      return `to ${seeds} of ${seedSwarm || seeds} peers, ${formatRatio(t.ratio)} ratio`;
    }
    return `${formatRatio(t.ratio)} ratio`;
  }
  if (t.dlspeed > 0) {
    if (swarm > 0) {
      return `${peers} of ${swarm} peers, ${formatSpeed(t.dlspeed)}, ${formatEta(t.eta)} left`;
    }
    return `${formatSpeed(t.dlspeed)}, ${formatEta(t.eta)} left`;
  }
  if (t.upspeed > 0) {
    return `${formatSpeed(t.upspeed)}, ${formatRatio(t.ratio)} ratio`;
  }
  return null;
}

/** A prose status sentence used by the Marquee lane. */
export function proseStatus(t: Torrent): string {
  const tone = stateToTone(t.state);
  const peers = t.num_leechs;
  const swarm = t.num_incomplete;
  const seeds = t.num_seeds;
  const seedSwarm = t.num_complete;

  if (tone === "stalled") {
    if (isComplete(t)) {
      return seedSwarm > 0
        ? `Stalled. Last seen ${seedSwarm} seeders.`
        : "Stalled. No seeders right now.";
    }
    return swarm > 0
      ? `Stalled. ${peers} of ${swarm} peers connected.`
      : "Stalled. No peers right now.";
  }

  if (tone === "error") {
    return t.state === "missingFiles"
      ? "Missing files. Files missing on disk."
      : "Error. Check qBittorrent logs.";
  }

  if (tone === "paused") {
    if (t.state === "queuedDL" || t.state === "queuedUP") return "Queued.";
    if (t.state.startsWith("checking")) return "Checking. Verifying files.";
    if (t.state === "moving") return "Moving files.";
    return `Paused at ${(t.progress * 100).toFixed(0)}%.`;
  }

  if (tone === "complete") {
    return seeds > 0
      ? `Seeding to ${seeds} of ${seedSwarm || seeds} peers, ${formatRatio(t.ratio)} ratio.`
      : `Completed. ${formatRatio(t.ratio)} ratio.`;
  }

  // Active downloading
  if (t.dlspeed > 0) {
    const rate = formatSpeed(t.dlspeed);
    const eta = formatEta(t.eta);
    if (swarm > 0) {
      return `Downloading from ${peers} of ${swarm} peers, ${rate}, ${eta} left.`;
    }
    return `Downloading at ${rate}, ${eta} left.`;
  }

  // Active uploading without complete tone (e.g. forcedUP partial)
  if (t.upspeed > 0) {
    return `Seeding at ${formatSpeed(t.upspeed)}, ${formatRatio(t.ratio)} ratio.`;
  }

  return "Idle.";
}
