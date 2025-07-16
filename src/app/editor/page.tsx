"use client";
import AppShellTemplate from "@/components/AppShellTemplate";
import {
  Button,
  Collapse,
  Group,
  Space,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export default function EditorPage() {
  const [opened_settings, { toggle: toggle_old_lyrics }] = useDisclosure(true);
  return (
    <AppShellTemplate is_in_editor={true}>
      <Collapse in={opened_settings}>
        <Group>
          <TextInput
            label="Original song name"
            description="Input the name of the original song."
          />
          <TextInput
            label="The name of the cover/parody"
            description="Input the name of the new song."
          />
          {/* <TextInput
            label="URL for lyrics"
            description="Paste URL for lyrics."
            placeholder="genius.com or azlyrics.com/ "
          /> */}
          <Textarea
            label={"Original Lyrics"}
            description="Paste the original lyrics of the song" // Think about better description
            autosize
            resize="both"
          ></Textarea>
        </Group>
      </Collapse>
      <Space h="md" />
      <Button onClick={toggle_old_lyrics}>Toggle settings visible</Button>
    </AppShellTemplate>
  );
}
