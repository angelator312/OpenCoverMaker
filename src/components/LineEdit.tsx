import { workingStatsAtom } from "@/data/atoms";
import { Button, Group, Text, TextInput } from "@mantine/core";
import { useAtomValue } from "jotai";
import React, { useCallback, useMemo } from "react";
import { useEffect, useState } from "react";
import CharecterCounter from "./StatCounters/CharecterCounter";
import WordCounter from "./StatCounters/WordsCounter";
import SyllableCounter from "./StatCounters/SyllableCounter";

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
      />
      <Group>
        {workingStats.characters && (
          <CharecterCounter
            originalLyrics={org_lyrics}
            newLyrics={new_lyrics}
          />
        )}
        {workingStats.words && (
          <WordCounter originalLyrics={org_lyrics} newLyrics={new_lyrics} />
        )}
        {workingStats.syllables && (
          <SyllableCounter originalLyrics={org_lyrics} newLyrics={new_lyrics} />
        )}
      </Group>
    </Group>
  );
}
