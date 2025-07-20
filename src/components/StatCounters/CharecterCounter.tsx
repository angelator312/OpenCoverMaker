import { Button, Group, Text } from "@mantine/core";
import { useEffect, useState } from "react";
const charectersDifferenceForYellow = 3;
const charectersDifferenceForRed = 10;

export default function CharecterCounter({
  originalLyrics,
  newLyrics,
}: {
  originalLyrics: string;
  newLyrics: string;
}) {
  const [newCharactersCount, setNewCharactersCount] = useState<number>(
    newLyrics.length,
  );
  const [differenceOfCharacters, setDifferenceOfCharacters] =
    useState<number>(0);
  const [colourForCharacters, setColourForCharacters] = useState<string>("");
  useEffect(() => setNewCharactersCount(newLyrics.length), [newLyrics]);
  useEffect(() => {
    setDifferenceOfCharacters(
      Math.abs(originalLyrics.length - newCharactersCount),
    );
  }, [originalLyrics, newCharactersCount]);
  useEffect(() => {
    setColourForCharacters(
      differenceOfCharacters < charectersDifferenceForYellow
        ? "green"
        : differenceOfCharacters < charectersDifferenceForRed
          ? "yellow"
          : "red",
    );
  }, [differenceOfCharacters]);
  return (
    <Group>
      <Text>Characters</Text>
      <Button color={colourForCharacters}> {newCharactersCount}</Button>
    </Group>
  );
}
