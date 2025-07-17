import { Button, Group, Text, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";

const charectersDifferenceForYellow = 3;
const wordsDifferenceForYellow = 3;
const charectersDifferenceForRed = 10;
const wordsDifferenceForRed = 10;

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
  const [originalCharectersCount, setOriginalCharectersCount] =
    useState<number>(org_lyrics.length);
  const [newCharectersCount, setNewCharectersCount] = useState<number>(
    new_lyrics.length,
  );
  const [newWordsCount, setNewWordsCount] = useState<number>(0);
  const [originalWordsCount, setOriginalWordsCount] = useState<number>(0);
  const [reloadsCount, setReloadsCount] = useState<number>(0);

  const [differenceOfCharecters, setDifferenceOfCharecters] = useState<number>(
    Math.abs(originalCharectersCount - newCharectersCount),
  );
  const [differenceOfWords, setDifferenceOfWords] = useState<number>(0);
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
    setReloadsCount(reloadsCount + 1);
  }, [originalCharectersCount, newCharectersCount]);

  useEffect(() => {
    setDifferenceOfWords(Math.abs(originalWordsCount - newWordsCount));
    setReloadsCount(reloadsCount + 1);
  }, [originalWordsCount, newWordsCount]);
  return (
    <Group grow>
      <TextInput
        autoFocus={autoFocus}
        onKeyUp={(e) => {
          if (e.key.startsWith("Enter")) onEnterKeyPressed();
          if (e.key.startsWith("Backspace")) {
            if (new_lyrics.length == 0) onLastBackSpacePressed();
            else setReloadsCount(reloadsCount + 1);
          }
        }}
        value={new_lyrics}
        onChange={(e) => setNewLyrics(e.currentTarget.value)}
        // inputSize="100"
      />
      <Group key={reloadsCount}>
        <Text>Charecters</Text>
        <Button
          color={
            differenceOfCharecters < charectersDifferenceForYellow
              ? "green"
              : differenceOfCharecters < charectersDifferenceForRed
                ? "yellow"
                : "red"
          }
        >
          {" "}
          {newCharectersCount}
        </Button>
        <Text>Words</Text>
        <Button
          color={
            differenceOfWords < wordsDifferenceForYellow
              ? "green"
              : differenceOfWords < wordsDifferenceForRed
                ? "yellow"
                : "red"
          }
        >
          {" "}
          {newWordsCount}
        </Button>
      </Group>
    </Group>
  );
}
