import { SongDetails } from "./types";

let all_songs_key: string = "keys";

export function save_song(songDetails: SongDetails) {
  if (load_song(songDetails.key) === null) _add_song(songDetails.key);
  localStorage.setItem(songDetails.key, JSON.stringify(songDetails));
}

export function load_song(key: string): SongDetails | null {
  const songDetails = localStorage.getItem(key);
  if (songDetails) {
    return JSON.parse(songDetails);
  }
  return null;
}

export function delete_song(key: string) {
  localStorage.removeItem(key);
}

export function get_songs(): SongDetails[] {
  return Object.keys(localStorage)
    .map((key) => load_song(key))
    .filter((song) => song !== null);
}

function _add_song(key: string) {
  let songs: string[] = JSON.parse(localStorage.getItem(all_songs_key) ?? "[]");
  songs.push(key);
  localStorage.setItem(all_songs_key, JSON.stringify(songs));
}
