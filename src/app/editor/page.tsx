"use client";
import AppShellTemplate from "@/components/AppShellTemplate";
import LineEdit from "@/components/LineEdit";
import {
  Button,
  Collapse,
  Group,
  Space,
  Stack,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

type QueryType = { [key: string]: string };
const original_song_name_par = "org_song_name";
const new_song_name_par = "new_song_name";
const url_lyrics_par = "url_for_lyrics";
const original_lyrics_par = "org_lyrics";
const new_lyrics_par = "new_lyrics";

export default function EditorPage() {
  const [searchQuery, setSearchQuery] = useState<QueryType>({});
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const updateSearchQuery = (updatedQuery: QueryType) => {
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
  const handleChange2 = (object_to_add: QueryType) => {
    const new_query: QueryType = { ...searchQuery, ...object_to_add };
    setSearchQuery(new_query);
    updateSearchQuery(new_query);
  };
  const handleChange = (key: string, e: ChangeEvent<HTMLInputElement>) => {
    handleChange2({ [key]: e.currentTarget.value });
  };

  const handleChangeForArea = (
    key: string,
    e: ChangeEvent<HTMLTextAreaElement>,
  ) => {
    handleChange2({ [key]: e.currentTarget.value });
  };

  const [opened_settings, { toggle: toggle_settings }] = useDisclosure(true);
  const [opened_lyrics, { toggle: toggle_lyrics }] = useDisclosure(true);
  const [newLyrics, setNewLyrics] = useState<string>("");
  const [originalLyricsLines, setOriginalLyricsLines] = useState<Array<string>>(
    [""],
  );

  useEffect(() => {
    const orgLyrics = searchParams.get(original_lyrics_par) ?? "";
    setOriginalLyricsLines(orgLyrics.split("\n"));
    if (newLyrics.trim().length == 0) setNewLyrics(orgLyrics);
    else {
      const org_new_lines = (orgLyrics.match(/\\n/g) || []).length;
      const new_new_lines = (newLyrics.match(/\\n/g) || []).length;
      if (new_new_lines < org_new_lines)
        setNewLyrics(newLyrics + "\n".repeat(org_new_lines - new_new_lines));
    }
  }, [searchParams.get(original_lyrics_par)]);
  return (
    <AppShellTemplate is_in_editor={true}>
      <Button onClick={toggle_settings}>
        {opened_settings ? "Hide" : "Show"} settings
      </Button>
      <Space h="md" />
      <Collapse in={opened_settings}>
        <Group>
          <TextInput
            value={searchParams.get(original_song_name_par) ?? ""}
            onChange={(e) => handleChange(original_song_name_par, e)}
            label="Name of the original song"
            description="Input the name of the original song."
          />
          <TextInput
            value={searchParams.get(new_song_name_par) ?? ""}
            onChange={(e) => handleChange(new_song_name_par, e)}
            label="Name of the new song"
            description="Input the name of the new song."
          />
          <TextInput
            value={searchParams.get(url_lyrics_par) ?? ""}
            onChange={(e) => handleChange(url_lyrics_par, e)}
            label="URL for lyrics"
            description="Paste URL for lyrics."
            placeholder="genius.com or azlyrics.com/ "
            disabled
          />
        </Group>
        <Space h="md" />
        <Button onClick={toggle_lyrics}>
          {opened_lyrics ? "Hide" : "Show"} Original Lyrics
        </Button>
        <Space h="md" />
        <Collapse in={opened_lyrics}>
          <Group>
            <Textarea
              value={searchParams.get(original_lyrics_par) ?? ""}
              onChange={(e) => handleChangeForArea(original_lyrics_par, e)}
              label="Original Lyrics"
              description="Paste the original lyrics of the song" // Think about better description
              autosize
              resize="both"
            />
          </Group>
        </Collapse>
      </Collapse>
      <Space h="md" />
      <Title order={3}>New lyrics</Title>
      <Space h="md" />
      <Stack>
        {newLyrics.split("\n").map((e: string, i: number) => {
          let key: string = originalLyricsLines[i];
          if (key.trim().length == 0) key = (Math.random() * 1000).toString();
          return (
            <LineEdit
              key={key}
              org_lyrics={originalLyricsLines[i]}
              new_lyrics={e}
              setNewLyrics={setNewLyrics}
            />
          );
        })}
      </Stack>
    </AppShellTemplate>
  );
}
