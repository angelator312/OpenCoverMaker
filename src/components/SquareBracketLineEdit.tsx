import { TypeEnum } from "@/data/enums";
import { selectOptionsForSquareBrackets } from "@/data/names";
import { ILineEditsGroup, WithRequired } from "@/data/types";
import { stringifyArgsFromType } from "@/data/utils";
import { Group, NumberInput, Select, Text, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
export const regexForVerse = /\[Verse (\d+):(.*)\]/g;
export const regexForChorus = /\[Chorus (\d+):(.*)\]/g;
export const regexForBridge = /\[Bridge (\d+):(.*)\]/g;
export const regexForPrechorus = /\[Pre-chorus (\d+):(.*)\]/g;
export const regexForIntro = /\[Intro ()\]/g;
export const regexForOutro = /\[Outro ()\]/g;
export const regexForTag = /\[Tag:(.*)\]/g;
export const regexForComment = /\[Comment:(.*)\]/g;
export const regexes = [
  regexForVerse,
  regexForChorus,
  regexForBridge,
  regexForPrechorus,
  regexForIntro,
  regexForOutro,
  regexForTag,
  regexForComment,
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
  if (str.match(regexForVerse)) return TypeEnum.Verse;
  if (str.match(regexForChorus)) return TypeEnum.Chorus;
  if (str.match(regexForBridge)) return TypeEnum.Bridge;
  if (str.match(regexForPrechorus)) return TypeEnum.Prechorus;
  if (str.match(regexForIntro)) return TypeEnum.Intro;
  if (str.match(regexForOutro)) return TypeEnum.Outro;
  if (str.match(regexForComment)) return TypeEnum.Comment;
  return TypeEnum.Verse;
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
