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
    // updateSearchQuery(new_query);
  };
  const handleChange = (
    key: string,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (key == original_lyrics_par) setOriginalLyrics(e.currentTarget.value);
    handleChange2({ [key]: e.currentTarget.value });
  };

  const [opened_settings, { toggle: toggle_settings }] = useDisclosure(true);
  const [opened_lyrics, { toggle: toggle_lyrics }] = useDisclosure(true);
  const [newLyrics, setNewLyrics] = useState<string>(
    searchParams.get(new_lyrics_par) ?? "",
  );
  const [originalLyrics, setOriginalLyrics] = useState<string>("");
  const [newLyricsLines, setNewLyricsLines] = useState<Array<string>>(
    newLyrics.split("\n"),
  );
  const [originalLyricsLines, setOriginalLyricsLines] = useState<Array<string>>(
    [""],
  );

  useEffect(() => {
    setOriginalLyricsLines(originalLyrics.split("\n"));
    if (newLyrics.trim().length == 0) setNewLyrics(originalLyrics);
    else {
      const org_new_lines = originalLyricsLines.length;
      const new_new_lines = newLyricsLines.length;
      if (new_new_lines < org_new_lines)
        setNewLyrics(newLyrics + "\n".repeat(org_new_lines - new_new_lines));
    }
  }, [originalLyrics]);

  useEffect(() => {
    setNewLyrics(newLyricsLines.join("\n"));
    handleChange2({ [new_lyrics_par]: newLyrics });
  }, [newLyricsLines]);
  return (
    <AppShellTemplate is_in_editor={true}>
      <Group>
        <Button onClick={toggle_settings}>
          {opened_settings ? "Hide" : "Show"} settings
        </Button>
        <Button onClick={() => updateSearchQuery(searchQuery)}>
          Save settings
        </Button>
      </Group>
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
              value={originalLyrics}
              onChange={(e) => handleChange(original_lyrics_par, e)}
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
        {newLyricsLines.map((e: string, i: number) => {
          return (
            <LineEdit
              onLastBackSpacePressed={() => {
                let splitL = newLyricsLines;
                console.log(splitL, ":");
                splitL = splitL.slice(0, i).concat(splitL.slice(i + 1));
                console.log(splitL);
                setNewLyricsLines(splitL);
              }}
              onEnterKeyPressed={() => {
                let tmp = newLyricsLines;
                tmp.splice(i, 0, "");
                setNewLyricsLines(tmp);
              }}
              key={e + " i:" + i}
              org_lyrics={originalLyricsLines[i] ?? ""}
              new_lyrics={e}
              setNewLyrics={(e) => {
                setNewLyricsLines(
                  newLyricsLines.map((e2, i2) => (i2 == i ? e : e2)),
                );
              }}
            />
          );
        })}
      </Stack>
    </AppShellTemplate>
  );
}
