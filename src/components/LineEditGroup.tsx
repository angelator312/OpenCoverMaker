import { Collapse, Group, Stack } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { LineEdit } from "./LineEdit";
import SquareBracketLineEdit from "./SquareBracketLineEdit";
import CollapsableLineEditSection from "./CollapsableLineEditSection";
import { I_LineEditsGroup } from "@/data/types";

function LineEditGroup({
  lineEditGroup,
  onLineEditGroupChange,
}: {
  lineEditGroup: I_LineEditsGroup;
  onLineEditGroupChange: React.Dispatch<React.SetStateAction<I_LineEditsGroup>>;
}) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [squareBracketLine, setSquareBracketLine] = useState<string>("");
  const [newLines, setNewLines] = useState<string[]>([]);
  const [originalLines, setOriginalLines] = useState<string[]>([]);

  useEffect(() => {
    setOriginalLines(lineEditGroup.originalLyrics.trim().split("\n"));
    setNewLines(lineEditGroup.newLyrics.trim().split("\n"));
  }, [lineEditGroup]);

  return (
    <>
      <SquareBracketLineEdit
        new_lyrics={squareBracketLine}
        setNewLyrics={setSquareBracketLine}
      />

      <CollapsableLineEditSection
        isCollapsed={isCollapsed}
        newLines={newLines}
        setNewLines={setNewLines}
        originalLines={originalLines}
      />
    </>
  );
}
export default React.memo(LineEditGroup);
