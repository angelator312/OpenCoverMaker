import { Menu, Text, Checkbox } from "@mantine/core";
import { useAtom } from "jotai";
import { workingStatsAtom } from "@/data/atoms";

export function MenuForEditor() {
  const [workingStats, setWorkingStats] = useAtom(workingStatsAtom);

  return (
    <Menu shadow="md" width={200} trigger="hover" closeDelay={200}>
      <Menu.Target>
        <Text>Stats menu</Text>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Counters</Menu.Label>
        <Menu.Item>
          <Checkbox
            checked={workingStats.characters}
            label="Characters"
            variant="outline"
            radius="xs"
            onChange={(e) =>
              setWorkingStats({
                ...workingStats,
                characters: e.currentTarget.checked,
              })
            }
          />
        </Menu.Item>
        <Menu.Item>
          <Checkbox
            checked={workingStats.words}
            label="Words"
            variant="outline"
            radius="xs"
            onChange={(e) =>
              setWorkingStats({
                ...workingStats,
                words: e.currentTarget.checked,
              })
            }
          />
        </Menu.Item>
        <Menu.Item>
          <Checkbox
            checked={workingStats.syllables}
            label="Syllables"
            variant="outline"
            radius="xs"
            onChange={(e) =>
              setWorkingStats({
                ...workingStats,
                syllables: e.currentTarget.checked,
              })
            }
          />
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
