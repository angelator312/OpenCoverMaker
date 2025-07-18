import { Button, Group } from "@mantine/core";
import React, { useMemo, useState } from "react";
import SquareBracketLineEdit from "./SquareBracketLineEdit";
import CollapsableLineEditSection from "./CollapsableLineEditSection";
import { useAtom } from "jotai";
import { lineEditGroupAtom } from "@/data/atoms";

function LineEditGroup({ idx }: { idx: number }) {
  const [lineEditsGroup, setLineEditsGroupChange] = useAtom(lineEditGroupAtom);
  const [isNotCollapsed, setIsNotCollapsed] = useState(false);

  const newLines = useMemo(() => {
    return lineEditsGroup[idx].newLyrics.trim().split("\n");
  }, [lineEditsGroup[idx].newLyrics]);

  const originalLines = useMemo(() => {
    return lineEditsGroup[idx].originalLyrics.trim().split("\n");
  }, [lineEditsGroup[idx].originalLyrics]);

  return (
    <>
      <Group>
        <SquareBracketLineEdit
          lineEditGroup={lineEditsGroup[idx]}
          setLineEditsGroup={(e) => {
            setLineEditsGroupChange((prev2) => {
              let prev = prev2;
              prev[idx] = {
                ...e,
              };
              console.log("Updated lineEditsGroup:", prev[idx]);
              return prev;
            });
          }}
        />
        <Button onClick={() => setIsNotCollapsed(!isNotCollapsed)}>
          {isNotCollapsed ? "^" : "˅"}
        </Button>
      </Group>

      <CollapsableLineEditSection
        isNotCollapsed={isNotCollapsed}
        newLines={newLines}
        setNewLines={(e) => {
          setLineEditsGroupChange((prev) => {
            prev[idx] = {
              ...lineEditsGroup[idx],
              newLyrics: e(newLines).join("\n"),
            };
            return prev;
          });
        }}
        originalLines={originalLines}
      />
    </>
  );
}
export default React.memo(LineEditGroup);
