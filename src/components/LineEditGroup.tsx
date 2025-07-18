import { Button, Group } from "@mantine/core";
import React, { EffectCallback, useEffect, useState } from "react";
import SquareBracketLineEdit from "./SquareBracketLineEdit";
import CollapsableLineEditSection from "./CollapsableLineEditSection";
import { I_LineEditsGroup } from "@/data/types";

// function useEffectAllDepsChange(fn: EffectCallback, deps: any[]) {
//   const [changeTarget, setChangeTarget] = useState(deps);

//   useEffect(() => {
//     setChangeTarget((prev) => {
//       if (prev.every((dep, i) => dep !== deps[i])) {
//         return deps;
//       }

//       return prev;
//     });
//   }, [deps]);

//   useEffect(fn, changeTarget);
// }

function LineEditGroup({
  lineEditGroup,
  onLineEditGroupChange,
}: {
  lineEditGroup: I_LineEditsGroup;
  onLineEditGroupChange: (newGroup: I_LineEditsGroup) => void;
}) {
  const [isNotCollapsed, setIsNotCollapsed] = useState(false);
  const [squareBracketLine, setSquareBracketLine] = useState<string>("");
  const [newLines, setNewLines] = useState<string[]>([]);
  const [originalLines, setOriginalLines] = useState<string[]>([]);

  useEffect(() => {
    setOriginalLines(lineEditGroup.originalLyrics.trim().split("\n"));
    setNewLines(lineEditGroup.newLyrics.trim().split("\n"));
  }, [lineEditGroup]);

  // useEffectAllDepsChange(() => {
  //   onLineEditGroupChange({
  //     originalLyrics: lineEditGroup.originalLyrics,
  //     newLyrics: newLines.join("\n"),
  //     squareBracketLine: squareBracketLine,
  //   });
  // }, [isNotCollapsed, newLines]);

  return (
    <>
      <Group>
        <SquareBracketLineEdit
          new_lyrics={squareBracketLine}
          setNewLyrics={setSquareBracketLine}
        />
        <Button onClick={() => setIsNotCollapsed(!isNotCollapsed)}>
          {isNotCollapsed ? "^" : "˅"}
        </Button>
      </Group>

      <CollapsableLineEditSection
        isNotCollapsed={isNotCollapsed}
        newLines={newLines}
        setNewLines={setNewLines}
        originalLines={originalLines}
      />
    </>
  );
}
export default React.memo(LineEditGroup);
