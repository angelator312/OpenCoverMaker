import { TypeEnum } from "@/data/enums";
import { selectOptionsForSquareBrackets } from "@/data/names";
import { defaultArgsFromType } from "@/data/utils";
import { Group, Select, Button } from "@mantine/core";
import { useState } from "react";
import { typeFromString } from "./SquareBracketLineEdit";

export default function AddButton({
  addLyrics,
}: {
  addLyrics: (type: TypeEnum, args: any[]) => void;
}) {
  const [value, setValue] = useState<string | null>(null);

  const handleAdd = () => {
    if (value) {
      const type = typeFromString(value);
      addLyrics(type, defaultArgsFromType(type));
      setValue(null);
    }
  };

  return (
    <Group>
      <Select
        data={selectOptionsForSquareBrackets}
        value={value}
        onChange={setValue}
      />
      <Button onClick={handleAdd}>Add</Button>
    </Group>
  );
}
