import { GenreEnum } from "@/data/enums";
import { SongDetails } from "@/data/types";
import { makeSongKey } from "@/data/utils";

export function defaultSongDetails(keyLength = 25): SongDetails {
  return {
    URLForLyrics: "",
    key: makeSongKey(keyLength),
    lastUpdated: Date.now(),
    originalLyrics: "",
    newLyrics: "",
    newArtist: "",
    newSongName: "",
    newGenre: GenreEnum.Pop,
    originalArtist: "",
    originalSongName: "",
  };
}
