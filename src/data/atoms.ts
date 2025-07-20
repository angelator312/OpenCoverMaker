import { atom } from "jotai";
import { WorkingStats } from "./types";

export const workingStatsAtom = atom<WorkingStats>({
  words: false,
  characters: true,
  syllables: false,
});
