import { Button, Group, Text, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";

export default function LineEdit({
  org_lyrics,
  new_lyrics,
  setNewLyrics,
  onEnterKeyPressed,
  onLastBackSpacePressed,
  autoFocus = false,
}: {
  org_lyrics: string;
  new_lyrics: string;
  autoFocus?: boolean;
  setNewLyrics: (e: string) => void;
  onEnterKeyPressed: () => void;
  onLastBackSpacePressed: () => void;
}) {
  const [differenceOfCharecters, setDifferenceOfCharecters] =
    useState<number>(0);
  const [differenceOfWords, setDifferenceOfWords] = useState<number>(0);

  const [originalCharectersCount, setOriginalCharectersCount] =
    useState<number>(0);
  const [newCharectersCount, setNewCharectersCount] = useState<number>(0);
  const [newWordsCount, setNewWordsCount] = useState<number>(0);
  const [originalWordsCount, setOriginalWordsCount] = useState<number>(0);

  useEffect(() => {
    setOriginalWordsCount(org_lyrics.split(" ").length);
    setOriginalCharectersCount(org_lyrics.length);
  }, [org_lyrics]);
  useEffect(() => {
    setNewWordsCount(new_lyrics.split(" ").length);
    setNewCharectersCount(new_lyrics.length);
  }, [new_lyrics]);

  useEffect(() => {
    setDifferenceOfCharecters(
      Math.abs(originalCharectersCount - newCharectersCount),
    );
    setDifferenceOfWords(Math.abs(originalWordsCount - newWordsCount));
  }, [originalWordsCount, newWordsCount]);
  return (
    <Group>
      <TextInput
        autoFocus={autoFocus}
        onKeyDown={(e) => {
          if (e.key.startsWith("Enter")) onEnterKeyPressed();
          if (e.key.startsWith("Backspace") && new_lyrics.length == 0)
            onLastBackSpacePressed();
        }}
        value={new_lyrics}
        onChange={(e) => setNewLyrics(e.currentTarget.value)}
        inputSize="100"
      />
      <Text>Charecters</Text>
      <Button> {newCharectersCount}</Button>
      <Text>Words</Text>
      <Button> {newWordsCount}</Button>
    </Group>
  );
}
