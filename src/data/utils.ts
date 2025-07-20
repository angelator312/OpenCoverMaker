import { regexes } from "@/components/SquareBracketLineEdit";
import { TypeEnum } from "./enums";
import { selectOptionsForSquareBrackets } from "./names";
import { ArgTypes, ILineEditsGroup, WithRequired } from "./types";

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

export function squareLineFromTypeAndArgs(
  type: TypeEnum,
  args: ArgTypes[],
): string {
  let argsString = "";
  let stringifyTypes = stringifyArgsFromType(type);
  if (args.length > 1 && stringifyTypes[0] == "number")
    argsString = args[0].toString() + ": ";
  else if (args.length > 0 && stringifyTypes[0] == "number")
    argsString = ": " + args[0].toString();
  else if (args.length > 0 && stringifyTypes[0] == "string")
    argsString = args[0].toString();
  if (args.length > 1 && stringifyTypes[1] == "string")
    argsString += args[1].toString();
  else if (args.length > 1 && stringifyTypes[1] == "number")
    argsString += args[1].toString();
  return "[" + selectOptionsForSquareBrackets[type] + argsString + "]\n";
}

export function partialLineEditFromStringAndType(
  line: string,
  type: TypeEnum,
): WithRequired<Partial<ILineEditsGroup>, "args"> {
  let args1 = regexFromType(type).exec(line);
  if (!args1) return { args: ["Error"] };
  let stringifyArgs = stringifyArgsFromType(type);
  let args2: string[] = args1
    .map((arg) => arg.trim())
    .slice(1, 1 + stringifyArgs.length);
  console.log("args2:", args2);
  let args: ArgTypes[] = [];
  let i = 0;
  for (let e of stringifyArgs) {
    let tmp1: ArgTypes;
    switch (e) {
      case "string":
        tmp1 = args2[i];
        break;
      case "number":
        tmp1 = parseInt(args2[i]);
        break;
      // case "boolean":
      //   tmp1 = args2[i] === "true";
      //   break;
      default:
        tmp1 = args2[i];
        break;
    }
    args.push(tmp1);
    i += 1;
  }
  return {
    args: args,
  };
}
function regexFromType(type: TypeEnum) {
  return regexes[type];
}
