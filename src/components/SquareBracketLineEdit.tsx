import { Group, Text, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
const regex_for_verse = /\[(.*?):(.*)\]/g;
const regex_for_chorus = /\[Chorus\]/g;
const regexes = [regex_for_verse, regex_for_chorus];
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
  type = TypeEnum.Verse,
}: {
  type?: TypeEnum;
  new_lyrics: string;
  autoFocus?: boolean;
  setNewLyrics: (e: string) => void;
  setAutoFocus: (e: number) => void;
}) {
  const [what, setWhat] = useState("");
  const [value, setValue] = useState("");
  useEffect(() => {
    let match = regexes[type].exec(new_lyrics);
    if (!match) return;
    setWhat(match.slice(1)[0]);
    setValue(match.slice(1)[1]);
    console.log(what, ":", value);
  }, [new_lyrics]);
  useEffect(() => {
    setNewLyrics(`[${what}:${value}]`);
  }, [what, value, type]);
  return (
    <Group>
      <Text>[</Text>
      <TextInput
        autoFocus={autoFocus}
        onKeyUp={(e) => {
          if (e.key.startsWith("Enter")) setAutoFocus(-1);
        }}
        value={what}
        onChange={(e) => setWhat(e.currentTarget.value)}
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
