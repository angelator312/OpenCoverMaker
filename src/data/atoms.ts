import { atom } from "jotai";
import { ILineEditsGroup } from "./types";

export const lineEditGroupAtom = atom<ILineEditsGroup[]>([]);
