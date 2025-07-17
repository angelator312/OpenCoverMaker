import { Group, Select, Text, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
const regex_for_verse = /\[Verse \d:(.*)\]/g;
const regex_for_chorus = /\[Chorus\]/g;
const regex_for_bridge = /\[Bridge\]/g;
const regex_for_prechorus = /\[Pre-chorus\]/g;
const regex_for_intro = /\[Intro\]/g;
const regex_for_outro = /\[Outro\]/g;
const regex_for_tag = /\[Tag-\]/g;
const regex_for_comment = /\[Comment-\]/g;
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
const names = [
  "Verse",
  "Chorus",
  "Bridge",
  "Pre-chorus",
  "Intro",
  "Outro",
  "Tag",
  "Comment",
];
enum TypeEnum {
  Verse = 0,
  Chorus = 1,
  Bridge = 2,
  Prechorus = 3,
  Intro = 4,
  Outro = 5,
  Tag = 6,
  Comment = 7,
}
export default function SquareBracketLineEdit({
  new_lyrics,
  setNewLyrics,
  setAutoFocus,
  autoFocus = false,
}: {
  new_lyrics: string;
  autoFocus?: boolean;
  setNewLyrics: (e: string) => void;
  setAutoFocus: (e: number) => void;
}) {
  const [type, setType] = useState(typeFromString(new_lyrics));
  const [value, setValue] = useState("");
  useEffect(() => {
    setType(typeFromString(new_lyrics));
    let match = regexes[type].exec(new_lyrics);
    if (!match) return;
    setValue(match.slice(1)[0]);
    console.log(type, ":", value);
  }, [new_lyrics, type]);
  useEffect(() => {
    setNewLyrics(`[${names[type]}:${value}]`);
  }, [type, value]);
  return (
    <Group>
      <Text>[</Text>
      <Select
        defaultValue={names[type]}
        data={names}
        onChange={(e) => setType(typeFromName(e ?? ""))}
        // inputSize="100"
      />
      <Text>:</Text>
      <TextInput
        autoFocus={autoFocus}
        onKeyUp={(e) => {
          if (e.key.startsWith("Enter")) setAutoFocus(-1);
        }}
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        // inputSize="100"
      />
      <Text>]</Text>
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
  return names.indexOf(name);
}
