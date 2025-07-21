import { saveSongDetails } from "@/data/LocalStorageSave";
import { SongDetails } from "@/data/types";
let lastTimeOfNewSongDetailFeature: number = 1753076997694;
/*
 * @param songKey - The key of the song to update.
 * @returns True if the song details were updated successfully, false otherwise.
 */
export function updatedSongDetails(song: SongDetails): SongDetails {
  if (!song.lastUpdated) song.lastUpdated = 0;
  if (song.lastUpdated > lastTimeOfNewSongDetailFeature) return song;
  //Add new features:

  song.lastUpdated = Date.now();
  saveSongDetails(song);
  return song;
}
