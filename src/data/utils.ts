import { TypeEnum } from "./enums";
import { selectOptionsForSquareBrackets } from "./names";

export function stringifyArgsFromType(type: TypeEnum): string[] {
  return args[type];
}
export function defaultLyricsLineFromType(type: TypeEnum): string {
  let strArgs = stringifyArgsFromType(type);
  let args: any[] = strArgs.map((e) => {
    let tmp: string | number;
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
  ArgsOnTag,
  ArgsOnComment,
];
