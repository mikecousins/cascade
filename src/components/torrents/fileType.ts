import type { Torrent } from "@/lib/api";

export type FileKind = "movie" | "show" | "music" | "book" | "archive" | "software" | "other";

const VIDEO_EXT = /\.(mkv|mp4|avi|mov|webm|m4v|flv|wmv|ts|mpg|mpeg)\b/i;
const AUDIO_EXT = /\.(flac|mp3|wav|aac|ogg|m4a|alac|opus)\b/i;
const ARCHIVE_EXT = /\.(zip|rar|7z|tar|gz|bz2|xz|iso)\b/i;
const SOFTWARE_EXT = /\.(exe|dmg|pkg|deb|rpm|appimage|msi)\b/i;
const BOOK_EXT = /\.(epub|mobi|azw3?|pdf|cbz|cbr)\b/i;

const SHOW_HINT = /\b(s\d{1,2}e\d{1,2}|season[. _-]?\d+|complete[. _-]?series)\b/i;

const CATEGORY_KIND: Record<string, FileKind> = {
  movies: "movie",
  movie: "movie",
  films: "movie",
  film: "movie",
  tv: "show",
  shows: "show",
  series: "show",
  music: "music",
  audio: "music",
  books: "book",
  ebooks: "book",
  audiobooks: "book",
  comics: "book",
  software: "software",
  apps: "software",
  games: "software",
  archives: "archive",
};

export function detectFileKind(torrent: Pick<Torrent, "name" | "category">): FileKind {
  const cat = (torrent.category || "").toLowerCase().trim();
  if (cat && CATEGORY_KIND[cat]) return CATEGORY_KIND[cat];

  const name = torrent.name.toLowerCase();

  if (BOOK_EXT.test(name)) return "book";
  if (AUDIO_EXT.test(name)) return "music";
  if (ARCHIVE_EXT.test(name)) return "archive";
  if (SOFTWARE_EXT.test(name)) return "software";
  if (SHOW_HINT.test(name)) return "show";
  if (VIDEO_EXT.test(name)) return "movie";

  return "other";
}
