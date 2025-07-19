import { TypeEnum } from "@/data/enums";
import { selectOptionsForSquareBrackets } from "@/data/names";
import { ILineEditsGroup, WithRequired } from "@/data/types";
import { Group, Select, Text, TextInput } from "@mantine/core";
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
      <TextInput
        autoFocus={autoFocus}
        value={lineEditGroup.args[0] ?? ""}
        onChange={(e) => {
          const new_args = lineEditGroup.args;
          new_args[0] = e.currentTarget.value;
          setLineEditsGroup({
            ...lineEditGroup,
            args: new_args,
          });
        }}
        // inputSize="100"
      />
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
  let args2: string[] = args1
    .map((arg) => arg.trim())
    .slice(1, 2 + Number(isTypeHavingSecondArgument(type)));
  console.log("args2:", args2);
  let args: ILineEditsGroup["args"] =
    type === TypeEnum.Verse ? [parseInt(args2[0]), args2[1]] : args2;
  return {
    args: args,
  };
}

function isTypeHavingSecondArgument(type: TypeEnum) {
  return type === TypeEnum.Verse; //|| type === TypeEnum.Chorus;
}
