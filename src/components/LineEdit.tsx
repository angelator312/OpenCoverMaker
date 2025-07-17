import { Group, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";

export default function LineEdit({
  org_lyrics,
  new_lyrics,
  setNewLyrics,
  onEnterKeyPressed,
}: {
  org_lyrics: string;
  new_lyrics: string;
  setNewLyrics: (e: string) => void;
  onEnterKeyPressed: () => void;
}) {
  const [differenceOfCharecter, setDifferenceOfCharecters] =
    useState<number>(0);
  useEffect(() => {
    setDifferenceOfCharecters(Math.abs(org_lyrics.length - new_lyrics.length));
  }, [org_lyrics, new_lyrics]);
  return (
    <Group>
      <TextInput
        autoFocus
        onKeyUp={(e) => {
          if (e.key.startsWith("Enter")) onEnterKeyPressed();
        }}
        value={new_lyrics}
        onChange={(e) => setNewLyrics(e.currentTarget.value)}
        inputSize="100"
      />
    </Group>
  );
}
