import { Group, Textarea, Tooltip } from "@mantine/core";
import { useEffect, useState } from "react";
import PasteButton from "./PasteButton";

export function EasyEditOfLyrics({
  originalLyrics,
  setOriginalLyrics,
  label,
  description,
}: {
  originalLyrics: string;
  setOriginalLyrics: (value: string) => void;
  label: string;
  description: string;
}) {
  const [columns, setColumns] = useState(1);
  const [rows, setRows] = useState(1);
  useEffect(() => {
    const lines = originalLyrics.split(/\r\n|\r|\n/);
    setColumns(
      lines.map((line) => line.length).reduce((a, b) => Math.max(a, b), 0),
    );
    setRows(lines.length);
  }, [originalLyrics]);
  return (
    <Group>
      <Textarea
        value={originalLyrics}
        onChange={(e) => setOriginalLyrics(e.target.value)}
        label={label}
        description={description}
        resize="both"
        cols={columns}
        rows={rows}
      />
      <PasteButton onPasteClicked={(e) => setOriginalLyrics(e)} />
    </Group>
  );
}
