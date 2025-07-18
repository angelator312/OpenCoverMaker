import { TypeEnum } from "@/data/enums";
import { selectOptionsForSquareBrackets } from "@/data/names";
import { Group, Select, Text, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
const regex_for_verse = /\[Verse:(.*)\]/g;
const regex_for_chorus = /\[Chorus()\]/g;
const regex_for_bridge = /\[Bridge:(.*)\]/g;
const regex_for_prechorus = /\[Pre-chorus (\d)\]/g;
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
  new_lyrics,
  setNewLyrics,
  autoFocus = false,
}: {
  new_lyrics: string;
  autoFocus?: boolean;
  setNewLyrics: (e: string) => void;
}) {
  const [type, setType] = useState(typeFromString(new_lyrics));
  const [value, setValue] = useState("");
  useEffect(() => {
    setType(typeFromString(new_lyrics));
  }, [new_lyrics]);
  useEffect(() => {
    let match = regexes[type].exec(new_lyrics);
    if (!match) return;
    setValue(match.slice(1)[0]);
  }, [new_lyrics, type]);
  useEffect(() => {
    setNewLyrics(`[${selectOptionsForSquareBrackets[type]}:${value}]`);
  }, [type, value]);
  return (
    <Group>
      <Select
        value={selectOptionsForSquareBrackets[type]}
        data={selectOptionsForSquareBrackets}
        onChange={(e) => setType(typeFromName(e ?? ""))}
        // inputSize="100"
      />
      <Text>:</Text>
      <TextInput
        autoFocus={autoFocus}
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
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
function typeFromName(name: string) {
  if (name.startsWith("[")) name = name.slice(1);
  if (name.endsWith("]")) name = name.slice(0, -1);
  return selectOptionsForSquareBrackets.indexOf(name);
}
