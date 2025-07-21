import { TypeEnum, GenreEnum } from "./enums";

export interface ILineEditsGroup {
  originalLyrics: string;
  newLyrics: string;
  type: TypeEnum;
  args: ArgTypes[];
}

export interface SongDetails {
  originalLyrics: string;
  newLyrics: string;
  newArtist: string;
  newSongName: string;
  newGenre: GenreEnum;
  originalArtist: string;
  originalSongName: string;
  URLForLyrics: string;
  key: string;
  lastUpdated: number;
}

export interface WorkingStats {
  words: boolean;
  characters: boolean;
  syllables: boolean;
}

export type ArgTypes = string | number;

export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };
