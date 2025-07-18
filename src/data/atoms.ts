import { atom } from "jotai";
import { ILineEditsGroup } from "./types";

export const lineEditGroup = atom<ILineEditsGroup[]>([]);
