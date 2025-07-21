import { Button, Group, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { syllable } from "syllable";
const syllablesDifferenceForYellow = 3;
const syllablesDifferenceForRed = 10;

export default function SyllablesCounter({
  originalLyrics,
  newLyrics,
}: {
  originalLyrics: string;
  newLyrics: string;
}) {
  const [originalSyllablesCount, setOriginalSyllablesCount] = useState<number>(
    syllable(originalLyrics),
  );
  const [newSyllablesCount, setNewSyllablesCount] = useState<number>(
    syllable(newLyrics),
  );
  const [differenceOfSyllables, setDifferenceOfSyllables] = useState<number>(0);
  const [colourForSyllables, setColourForSyllables] = useState<string>("");
  useEffect(() => setNewSyllablesCount(syllable(newLyrics)), [newLyrics]);
  useEffect(() => {
    setDifferenceOfSyllables(
      Math.abs(originalSyllablesCount - newSyllablesCount),
    );
  }, [originalSyllablesCount, newSyllablesCount]);
  useEffect(() => {
    setColourForSyllables(
      differenceOfSyllables < syllablesDifferenceForYellow
        ? "green"
        : differenceOfSyllables < syllablesDifferenceForRed
          ? "yellow"
          : "red",
    );
  }, [differenceOfSyllables]);
  return (
    <Group>
      <Text>Syllables</Text>
      <Button color={colourForSyllables}> {newSyllablesCount}</Button>
    </Group>
  );
}
