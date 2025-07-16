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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const original_song_name_par = "org_song_name";
const new_song_name_par = "new_song_name";
const url_lyrics_par = "url_for_lyrics";

export default function EditorPage() {
  const [searchQuery, setSearchQuery] = useState({
    name: "",
    // you can add more keys to this
  });
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const updateSearchQuery = (updatedQuery: { [key: string]: any }) => {
    const params = new URLSearchParams(searchParams);
    Object.keys(updatedQuery).forEach((key) => {
      if (updatedQuery[key]) {
        params.set(key, updatedQuery[key]);
      } else {
        params.delete(key);
      }
    });
    const queryString = params.toString();
    const updatedPath = queryString ? `${pathname}?${queryString}` : pathname;
    router.push(updatedPath);
  };

  const [opened_settings, { toggle: toggle_old_lyrics }] = useDisclosure(true);
  return (
    <AppShellTemplate is_in_editor={true}>
      <Collapse in={opened_settings}>
        <Group>
          <TextInput
            value={searchParams.get(original_song_name_par) ?? ""}
            // onChange={(e) => searchParams.set(original_song_name_par, "")}
            label="Original song name"
            description="Input the name of the original song."
          />
          <TextInput
            value={searchParams.get(new_song_name_par) ?? ""}
            label="The name of the cover/parody"
            description="Input the name of the new song."
          />
          {/* <TextInput
            value={searchParams.get(url_lyrics_par) ?? ""}
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
