import { TypeEnum } from "@/data/enums";
import { selectOptionsForSquareBrackets } from "@/data/names";
import { ArgTypes, ILineEditsGroup, WithRequired } from "@/data/types";
import { stringifyArgsFromType } from "@/data/utils";
import { Group, NumberInput, Select, Text, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
const regex_for_verse = /\[Verse:(.*)\]/g;
const regex_for_chorus = /\[Chorus:(.*)\]/g;
const regex_for_bridge = /\[Bridge:(.*)\]/g;
const regex_for_prechorus = /\[Pre-chorus:(.*)\]/g;
const regex_for_intro = /\[Intro ()\]/g;
const regex_for_outro = /\[Outro ()\]/g;
const regex_for_tag = /\[Tag:(.*)\]/g;
const regex_for_comment = /\[Comment:(.*)\]/g;
const regexes = [
  regex_for_verse,
  regex_for_chorus,
  regex_for_bridge,
  regex_for_prechorus,
  regex_for_intro,
  regex_for_outro,
  regex_for_tag,
  regex_for_comment,
];

export default function SquareBracketLineEdit({
  lineEditGroup,
  autoFocus = false,
  setLineEditsGroup,
}: {
  autoFocus?: boolean;
  lineEditGroup: ILineEditsGroup;
  setLineEditsGroup: (group: ILineEditsGroup) => void;
}) {
  const [stringifyArgs, setStringifyArgs] = useState<string[]>([]);
  useEffect(() => {
    setStringifyArgs(stringifyArgsFromType(lineEditGroup.type));
  }, [lineEditGroup.type]);
  // const [value, setValue] = useState("");
  return (
    <Group>
      <Select
        value={selectOptionsForSquareBrackets[lineEditGroup.type]}
        data={selectOptionsForSquareBrackets}
        onChange={(e) => {
          const type = typeFromName(e ?? "");
          setLineEditsGroup({ ...lineEditGroup, type });
        }}
        // inputSize="100"
      />
      <Text>:</Text>
      {stringifyArgs.map((arg, index) =>
        arg == "string" ? (
          <TextInput
            key={index}
            autoFocus={autoFocus}
            value={lineEditGroup.args[index] ?? ""}
            onChange={(e) => {
              const new_args = lineEditGroup.args;
              new_args[index] = e.currentTarget.value;
              setLineEditsGroup({
                ...lineEditGroup,
                args: new_args,
              });
            }}
            // inputSize="100"
          />
        ) : arg == "number" ? (
          <NumberInput
            key={index}
            autoFocus={autoFocus}
            value={lineEditGroup.args[index] ?? ""}
            onChange={(e) => {
              const new_args = lineEditGroup.args;
              if (typeof e === "string") new_args[index] = parseInt(e);
              else new_args[index] = e;
              setLineEditsGroup({
                ...lineEditGroup,
                args: new_args,
              });
            }}
            // inputSize="100"
          />
        ) : null,
      )}
    </Group>
  );
}

export function typeFromString(str: string) {
  if (str.match(regex_for_verse)) return TypeEnum.Verse;
  if (str.match(regex_for_chorus)) return TypeEnum.Chorus;
  if (str.match(regex_for_bridge)) return TypeEnum.Bridge;
  if (str.match(regex_for_prechorus)) return TypeEnum.Prechorus;
  if (str.match(regex_for_intro)) return TypeEnum.Intro;
  if (str.match(regex_for_outro)) return TypeEnum.Outro;
  if (str.match(regex_for_tag)) return TypeEnum.Tag;
  if (str.match(regex_for_comment)) return TypeEnum.Comment;
  return TypeEnum.Verse;
}

function regexFromType(type: TypeEnum) {
  return regexes[type];
}

export function typeFromName(name: string) {
  if (name.startsWith("[")) name = name.slice(1);
  if (name.endsWith("]")) name = name.slice(0, -1);
  return selectOptionsForSquareBrackets.indexOf(name);
}

export function typeAndArgsToString(
  lineEditGroup: WithRequired<Partial<ILineEditsGroup>, "args" | "type">,
) {
  const name = selectOptionsForSquareBrackets[lineEditGroup.type];
  console.log(`[${name}:${lineEditGroup.args.join(",")}]`);
  return `[${name}:${lineEditGroup.args.join(",")}]`;
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
    .slice(1, 2)[0]
    .split(",");
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
