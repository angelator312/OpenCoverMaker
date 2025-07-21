import { Group, Button, Text } from "@mantine/core";
import { useEffect, useMemo, useState } from "react";

const wordsDifferenceForYellow = 3;
const wordsDifferenceForRed = 5;

export default function WordCounter({
  newLyrics,
  originalLyrics,
}: {
  newLyrics: string;
  originalLyrics: string;
}) {
  const newWords = useMemo(
    () => newLyrics.trim().split(/\s+/).length,
    [newLyrics],
  );
  const [newWordsCount, setNewWordsCount] = useState<number>(newWords);

  const originalWordsCount = useMemo(
    () => originalLyrics.trim().split(/\s+/).length,
    [originalLyrics],
  );

  const absoluteDifferenceOfWords = useMemo(
    () => Math.abs(originalWordsCount - newWordsCount),
    [originalWordsCount, newWordsCount],
  );

  const [differenceOfWords, setDifferenceOfWords] = useState<number>(
    absoluteDifferenceOfWords,
  );

  const [colourForWords, setColourForWords] = useState<string>("");

  useEffect(() => setNewWordsCount(newWords), [newWords]);
  useEffect(
    () => setDifferenceOfWords(absoluteDifferenceOfWords),
    [absoluteDifferenceOfWords],
  );

  useEffect(() => {
    setColourForWords(
      differenceOfWords < wordsDifferenceForYellow
        ? "green"
        : differenceOfWords < wordsDifferenceForRed
          ? "yellow"
          : "red",
    );
  }, [differenceOfWords]);

  return (
    <Group>
      <Text>Words</Text>
      <Button color={colourForWords}> {newWordsCount}</Button>
    </Group>
  );
}
