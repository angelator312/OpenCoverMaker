import { updatedSongDetails } from "@/updater/UpdaterForSongDetails";
import { SongDetails } from "./types";

let all_songs_key: string = "keys";

export function saveSongDetails(songDetails: SongDetails) {
  if (_isThereASong(songDetails.key) === null) _addSong(songDetails.key);
  localStorage.setItem(songDetails.key, JSON.stringify(songDetails));
}

export function loadSongDetails(key: string): SongDetails | null {
  let song = _loadSongDetails(key);
  if (song) {
    return updatedSongDetails(song);
  }
  return null;
}

export function _loadSongDetails(key: string): SongDetails | null {
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

export function _isThereASong(key: string): boolean {
  return localStorage.getItem(key) !== null;
}
