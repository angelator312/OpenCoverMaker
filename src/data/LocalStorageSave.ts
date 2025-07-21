import { SongDetails } from "./types";

let all_songs_key: string = "keys";

export function saveSongDetails(songDetails: SongDetails) {
  if (loadSongDetails(songDetails.key) === null) _addSong(songDetails.key);
  localStorage.setItem(songDetails.key, JSON.stringify(songDetails));
}

export function loadSongDetails(key: string): SongDetails | null {
  const songDetails = localStorage.getItem(key);
  if (songDetails) {
    return JSON.parse(songDetails);
  }
  return null;
}

export function deleteSongDetails(key: string) {
  localStorage.removeItem(key);
}

export function getAllSongs(): SongDetails[] {
  return JSON.parse(localStorage.getItem(all_songs_key) ?? "[]")
    .map((key: string) => loadSongDetails(key))
    .filter((song: SongDetails | null) => song !== null);
}

function _addSong(key: string) {
  let songs: string[] = JSON.parse(localStorage.getItem(all_songs_key) ?? "[]");
  songs.push(key);
  localStorage.setItem(all_songs_key, JSON.stringify(songs));
}
