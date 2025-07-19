import { Button, Group, Text, TextInput } from "@mantine/core";
import React, { useCallback, useMemo } from "react";
import { useEffect, useState } from "react";

const charectersDifferenceForYellow = 3;
const wordsDifferenceForYellow = 3;
const charectersDifferenceForRed = 10;
const wordsDifferenceForRed = 10;
export let LineEdit = React.memo(LineEditComp);

function LineEditComp({
  org_lyrics,
  new_lyrics,
  setNewLyrics,
  onEnterKeyPressed,
  onLastBackSpacePressed,
  autoFocus = false,
  onFocus,
}: {
  onFocus: () => void;
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

  const [differenceOfCharecters, setDifferenceOfCharecters] =
    useState<number>(0);
  const [differenceOfWords, setDifferenceOfWords] = useState<number>(0);

  const [colourForCharecters, setColourForCharecters] = useState<string>("");
  const [colourForWords, setColourForWords] = useState<string>("");

  useEffect(() => {
    setOriginalWordsCount(orgWords);
    setOriginalCharectersCount(org_lyrics.length);
    update();
  }, [org_lyrics]); // eslint-disable-line

  useEffect(() => {
    setNewWordsCount(newWords);
    setNewCharectersCount(new_lyrics.length);
    update();
  }, [new_lyrics]); // eslint-disable-line

  const absoluteDifferenceOfCharecters = useMemo(
    () => Math.abs(originalCharectersCount - newCharectersCount),
    [originalCharectersCount, newCharectersCount],
  );
  const absoluteDifferenceOfWords = useMemo(
    () => Math.abs(originalWordsCount - newWordsCount),
    [originalWordsCount, newWordsCount],
  );

  const newWords = useMemo(() => new_lyrics.split(/\s+/).length, [new_lyrics]);
  const orgWords = useMemo(() => org_lyrics.split(/\s+/).length, [org_lyrics]);

  const update = useCallback(() => {
    setDifferenceOfCharecters(absoluteDifferenceOfCharecters);
    setDifferenceOfWords(absoluteDifferenceOfWords);
  }, [absoluteDifferenceOfCharecters, absoluteDifferenceOfWords]);

  useEffect(() => {
    setColourForCharecters(
      differenceOfCharecters < charectersDifferenceForYellow
        ? "green"
        : differenceOfCharecters < charectersDifferenceForRed
          ? "yellow"
          : "red",
    );
  }, [differenceOfCharecters]);

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
    <Group grow>
      <TextInput
        onFocus={onFocus}
        autoFocus={autoFocus}
        onKeyUp={(e) => {
          if (e.key.startsWith("Enter")) onEnterKeyPressed();
          if (e.key.startsWith("Backspace")) {
            if (new_lyrics.length == 0) onLastBackSpacePressed();
          }
        }}
        value={new_lyrics}
        onChange={(e) => {
          setNewLyrics(e.currentTarget.value);
        }}
        variant={autoFocus ? "default" : "unstyled"}
        // inputSize="100"
      />
      <Group>
        <Text>Characters</Text>
        <Button color={colourForCharecters}> {newCharectersCount}</Button>
        <Text>Words</Text>
        <Button color={colourForWords}> {newWordsCount}</Button>
      </Group>
    </Group>
  );
}
