import { Collapse, Stack } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { LineEdit } from "./LineEdit";

function CollapsableLineEditSection({
  isNotCollapsed,
  originalLines,
  newLines,
  setNewLines,
}: {
  isNotCollapsed: boolean;
  originalLines: string[];
  newLines: string[];
  setNewLines: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const [focusedLine, setFocusedLine] = useState<number>(0);
  return (
    <Collapse in={isNotCollapsed}>
      <Stack>
        {newLines.map((line, index) => (
          <LineEdit
            autoFocus={focusedLine === index}
            key={index}
            onFocus={function (): void {
              setFocusedLine(index);
            }}
            org_lyrics={originalLines[index]}
            new_lyrics={line}
            setNewLyrics={function (e: string): void {
              setNewLines((prevLines) => {
                const newLines = [...prevLines];
                newLines[index] = e;
                return newLines;
              });
            }}
            onEnterKeyPressed={function (): void {
              throw new Error("Function not implemented.");
            }}
            onLastBackSpacePressed={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        ))}
      </Stack>
    </Collapse>
  );
}
export default React.memo(CollapsableLineEditSection);
