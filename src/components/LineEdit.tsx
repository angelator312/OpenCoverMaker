import { workingStatsAtom } from "@/data/atoms";
import { Button, Group, Text, TextInput } from "@mantine/core";
import { useAtomValue } from "jotai";
import React, { useCallback, useMemo } from "react";
import { useEffect, useState } from "react";
import CharecterCounter from "./StatCounters/CharecterCounter";

const wordsDifferenceForYellow = 3;
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
  const workingStats = useAtomValue(workingStatsAtom);
  const [originalCharectersCount, setOriginalCharectersCount] =
    useState<number>(org_lyrics.length);

  const [newWordsCount, setNewWordsCount] = useState<number>(0);
  const [originalWordsCount, setOriginalWordsCount] = useState<number>(0);

  const [differenceOfWords, setDifferenceOfWords] = useState<number>(0);

  const [colourForWords, setColourForWords] = useState<string>("");

  useEffect(() => {
    setOriginalWordsCount(orgWords);
    setOriginalCharectersCount(org_lyrics.length);
    update();
  }, [org_lyrics]); // eslint-disable-line

  useEffect(() => {
    setNewWordsCount(newWords);
    update();
  }, [new_lyrics]); // eslint-disable-line

  const absoluteDifferenceOfWords = useMemo(
    () => Math.abs(originalWordsCount - newWordsCount),
    [originalWordsCount, newWordsCount],
  );

  const newWords = useMemo(() => new_lyrics.split(/\s+/).length, [new_lyrics]);
  const orgWords = useMemo(() => org_lyrics.split(/\s+/).length, [org_lyrics]);

  const update = useCallback(() => {
    setDifferenceOfWords(absoluteDifferenceOfWords);
  }, [absoluteDifferenceOfWords]);

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
        <Text>Words</Text>
        <Button color={colourForWords}> {newWordsCount}</Button>
        {workingStats.characters && (
          <CharecterCounter
            originalLyrics={org_lyrics}
            newLyrics={new_lyrics}
          />
        )}
      </Group>
    </Group>
  );
}
