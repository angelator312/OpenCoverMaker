"use client";
import AppShellTemplate from "@/components/AppShellTemplate";
import { LineEdit } from "@/components/LineEdit";
import LineEditGroup from "@/components/LineEditGroup";
import SquareBracketLineEdit from "@/components/SquareBracketLineEdit";
import { selectOptionsForSquareBrackets } from "@/data/names";
import { I_LineEditsGroup } from "@/data/types";
import {
  Button,
  Collapse,
  Group,
  Select,
  Space,
  Stack,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useCallback, useEffect, useState } from "react";

type QueryType = { [key: string]: string };
const original_song_name_par = "org_song_name";
const new_song_name_par = "new_song_name";
const url_lyrics_par = "url_for_lyrics";
const original_lyrics_par = "org_lyrics";
const new_lyrics_par = "new_lyrics";

const regexForSquareBrackets = /^(\[.*\])$/gm;

function fromLinesToLineEditGroups(
  originalLyrics: string,
  newLyrics: string,
): I_LineEditsGroup[] {
  const originalLines = originalLyrics.trim().split(regexForSquareBrackets);
  const newLines = newLyrics.trim().split(regexForSquareBrackets);

  const lineEditGroups: I_LineEditsGroup[] = [];
  // console.log("originalLines:", originalLines);
  // console.log("newLines:", newLines);

  let ptr_new = 0,
    ptr_org = 0;
  for (; ptr_new < newLines.length; ptr_new++, ptr_org++) {
    const originalLine = originalLines[ptr_org];
    const newLine = newLines[ptr_new];
    if (newLine.trim().length === 0 && originalLine.trim().length === 0)
      continue;
    if (newLine.startsWith("["))
      lineEditGroups.push({
        originalLyrics: originalLines[++ptr_org] ?? "",
        newLyrics: newLines[++ptr_new],
        squareBracketLine: newLine,
      });
  }
  console.log("linegroups:", lineEditGroups);
  return lineEditGroups;
}

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

  const [opened_settings, { toggle: toggle_settings }] = useDisclosure(false);
  const [opened_lyrics, { toggle: toggle_lyrics }] = useDisclosure(true);
  const [newLyrics, setNewLyrics] = useState<string>(
    searchParams.get(new_lyrics_par) ?? "",
  );
  const [originalLyrics, setOriginalLyrics] = useState<string>(
    searchParams.get(original_lyrics_par) ?? "",
  );
  const [lineEditGroups, setLineEditGroups] = useState<I_LineEditsGroup[]>(
    fromLinesToLineEditGroups(originalLyrics, newLyrics),
  );
  const [reloadCount, setReloadCount] = useState<number>(0);

  useEffect(() => {
    if (newLyrics.trim().length == 0) setNewLyrics(originalLyrics);
  }, [originalLyrics]);
  useEffect(() => {
    setLineEditGroups(fromLinesToLineEditGroups(originalLyrics, newLyrics));
  }, [originalLyrics, newLyrics]);
  //TODO:Optimize the following
  const updateNewLyrics = useCallback(() => {
    //TODO:Make sure the new lyrics are with valid [] format
    const tmp: string = lineEditGroups
      .map((group) => group.squareBracketLine + group.originalLyrics)
      .join("");
    console.log("lyrics:", tmp);
    setNewLyrics(tmp);
    handleChange2({ [new_lyrics_par]: tmp });
  }, [lineEditGroups]);
  return (
    <AppShellTemplate is_in_editor={true}>
      <Group>
        <Button onClick={toggle_settings}>
          {opened_settings ? "Hide" : "Show"} settings
        </Button>
        <Button
          onClick={() => {
            updateNewLyrics();
            updateSearchQuery(searchQuery);
          }}
        >
          Save in URL
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
      <Stack key={"reloads:" + reloadCount}>
        {lineEditGroups.map((e: I_LineEditsGroup, i: number) => {
          return (
            <LineEditGroup
              key={i}
              lineEditGroup={lineEditGroups[i]}
              setLineEditGroupChange={(newGroup) => {
                setLineEditGroups((prev) => {
                  const newGroups = [...prev];
                  newGroups[i] = newGroup;
                  return newGroups;
                });
              }}
            />
          );
        })}
      </Stack>
      <Group>
        <Select data={selectOptionsForSquareBrackets} />
        <Button onClick={() => {}}>Add</Button>
      </Group>
    </AppShellTemplate>
  );
}
