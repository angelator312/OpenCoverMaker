"use client";
import AppShellTemplate from "@/components/AppShellTemplate";
import { Button, Collapse, Textarea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export default function EditorPage() {
  const [opened_old_lyrics, { toggle: toggle_old_lyrics }] =
    useDisclosure(false);
  return (
    <AppShellTemplate is_in_editor={true}>
      <Button onClick={toggle_old_lyrics}>Toggle Old Lyrics</Button>
      <Collapse in={opened_old_lyrics}>
        <Textarea autosize resize="both"></Textarea>
      </Collapse>
    </AppShellTemplate>
  );
}
