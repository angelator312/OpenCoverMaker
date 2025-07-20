import { Menu, Text, Checkbox } from "@mantine/core";

export function MenuForEditor() {
  return (
    <Menu shadow="md" width={200} trigger="hover">
      <Menu.Target>
        <Text>Stats menu</Text>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Counters</Menu.Label>
        <Menu.Item>
          <Checkbox label="Characters" variant="outline" radius="xs" />
        </Menu.Item>
        <Menu.Item>
          <Checkbox label="Words" variant="outline" radius="xs" />
        </Menu.Item>
        <Menu.Item>
          <Checkbox label="Syllables" variant="outline" radius="xs" />
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
