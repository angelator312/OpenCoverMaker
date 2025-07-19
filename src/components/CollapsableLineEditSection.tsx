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
  setNewLines: (e: (prevState: string[]) => string[]) => void;
}) {
  const [focusedLine, setFocusedLine] = useState<number>(0);
  const [reloadCount, setReloadCount] = useState<number>(0);
  return (
    <Collapse in={isNotCollapsed}>
      <Stack key={"reload:" + reloadCount}>
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
            onEnterKeyPressed={() => {
              setNewLines((prevLines) => {
                const newLines = [...prevLines];
                newLines.splice(index + 1, 0, "");
                console.log("Enter key pressed:", newLines);
                return newLines;
              });
              setReloadCount(reloadCount + 1);
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
