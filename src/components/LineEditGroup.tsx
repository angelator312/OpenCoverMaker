import { Button, Group } from "@mantine/core";
import React, { useMemo, useState } from "react";
import SquareBracketLineEdit from "./SquareBracketLineEdit";
import CollapsableLineEditSection from "./CollapsableLineEditSection";
import { ILineEditsGroup } from "@/data/types";

function LineEditGroup({
  lineEditGroup,
  setLineEditGroupChange,
}: {
  lineEditGroup: ILineEditsGroup;
  setLineEditGroupChange: (newGroup: ILineEditsGroup) => void;
}) {
  const [isNotCollapsed, setIsNotCollapsed] = useState(false);

  const newLines = useMemo(() => {
    return lineEditGroup.newLyrics.trim().split("\n");
  }, [lineEditGroup.newLyrics]);

  const originalLines = useMemo(() => {
    return lineEditGroup.originalLyrics.trim().split("\n");
  }, [lineEditGroup.originalLyrics]);

  return (
    <>
      <Group>
        <SquareBracketLineEdit
          lineEditGroup={lineEditGroup}
          setLineEditsGroup={setLineEditGroupChange}
        />
        <Button onClick={() => setIsNotCollapsed(!isNotCollapsed)}>
          {isNotCollapsed ? "^" : "˅"}
        </Button>
      </Group>

      <CollapsableLineEditSection
        isNotCollapsed={isNotCollapsed}
        newLines={newLines}
        setNewLines={(e) => {
          console.log(e);
          setLineEditGroupChange({
            ...lineEditGroup,
            newLyrics: e(newLines).join("\n"),
          });
        }}
        originalLines={originalLines}
      />
    </>
  );
}
export default React.memo(LineEditGroup);
