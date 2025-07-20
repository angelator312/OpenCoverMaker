import { TypeEnum } from "./enums";
import { selectOptionsForSquareBrackets } from "./names";
import { ArgTypes } from "./types";

export function stringifyArgsFromType(type: TypeEnum): string[] {
  return args[type];
}
export function defaultArgsFromType(type: TypeEnum) {
  let strArgs = stringifyArgsFromType(type);
  let args: ArgTypes[] = strArgs.map((e) => {
    let tmp: ArgTypes;
    switch (e) {
      case "string":
        tmp = "";
        break;
      case "number":
        tmp = 0;
        break;
      default:
        tmp = "";
        break;
    }
    return tmp;
  });
  return args;
}
export function defaultLyricsLineFromType(type: TypeEnum): string {
  return "[" + selectOptionsForSquareBrackets[type] + args.join(",") + "]\n";
}
let ArgsOnVerse = ["number", "string"];
let ArgsOnChorus = ["number", "string"];
let ArgsOnBridge: string[] = [];
let ArgsOnPrechorus = ["number", "string"];
let ArgsOnIntro: string[] = [];
let ArgsOnOutro: string[] = [];
// [tag name]
let ArgsOnTag = ["string"];
// [comment]
let ArgsOnComment = ["string"];

let args: string[][] = [
  ArgsOnVerse,
  ArgsOnChorus,
  ArgsOnBridge,
  ArgsOnPrechorus,
  ArgsOnIntro,
  ArgsOnOutro,
  ArgsOnComment,
];
export function makeSongKey(length: number) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; ++i) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
