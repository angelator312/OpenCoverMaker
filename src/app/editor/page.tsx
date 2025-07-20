"use client";
import AddButton from "@/components/AddButton";
import AppShellTemplate from "@/components/AppShellTemplate";
import LineEditGroup from "@/components/LineEditGroup";
import {
  typeAndArgsToString,
  typeFromString,
} from "@/components/SquareBracketLineEdit";
import { GenreEnum } from "@/data/enums";
import { load_song, save_song } from "@/data/LocalStorageSave";
import { ILineEditsGroup, SongDetails } from "@/data/types";
import {
  partialLineEditFromStringAndType,
  squareLineFromTypeAndArgs,
} from "@/data/utils";
import { Button, Group, Space, Stack, Title } from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const regexForSquareBrackets = /(\[.*\]\n)/gm;

function fromLinesToLineEditGroups(
  originalLyrics: string,
  newLyrics: string,
): ILineEditsGroup[] {
  const originalLines = originalLyrics.split(regexForSquareBrackets);
  const newLines = newLyrics.split(regexForSquareBrackets);

  const lineEditGroups: ILineEditsGroup[] = [];
  // console.log("originalLines:", originalLines);
  console.log("newLines:", newLines);

  let ptr_new = 0,
    ptr_org = 0;
  for (; ptr_new < newLines.length; ptr_new++, ptr_org++) {
    const originalLine = originalLines[ptr_org];
    const newLine = newLines[ptr_new];
    if (newLine.trim().length === 0 && originalLine.trim().length === 0)
      continue;
    if (newLine.startsWith("[")) {
      const type = typeFromString(newLine);
      lineEditGroups.push({
        originalLyrics: originalLines[++ptr_org] ?? "",
        newLyrics: newLines[++ptr_new] ?? originalLines[++ptr_org] ?? "",
        type,
        args: partialLineEditFromStringAndType(newLine, type).args,
      });
    }
  }
  console.log("linegroups:", lineEditGroups);
  return lineEditGroups;
}

export default function EditorPage() {
  const [searchQuery, setSearchQuery] = useState<SongDetails>({
    newSongName: "",
    newArtist: "",
    newGenre: GenreEnum.Pop,
    newLyrics: "",
    originalArtist: "",
    originalLyrics: "",
    originalSongName: "",
    URLForLyrics: "",
    key: "KEY",
  });
  const searchParams = useSearchParams();
  const router = useRouter();
  const updateSearchQuery = (updatedQuery: SongDetails) => {
    console.log("updatedQuery:", updatedQuery);
    save_song(updatedQuery);
  };

  const [newLyrics, setNewLyrics] = useState<string>("");
  const [originalLyrics, setOriginalLyrics] = useState<string>("");
  const [lineEditGroups, setLineEditGroups] = useState<ILineEditsGroup[]>([]);
  const [reloadCount, setReloadCount] = useState<number>(0);

  // eslint-disable-next-line
  useEffect(() => {
    if (newLyrics.trim().length == 0) setNewLyrics(originalLyrics); // eslint-disable-line
  }, [originalLyrics]); // eslint-disable-line
  useEffect(() => {
    console.log("newLyrics:", newLyrics);
    setLineEditGroups(fromLinesToLineEditGroups(originalLyrics, newLyrics));
  }, [originalLyrics, newLyrics]);

  useEffect(() => {
    const songId = searchParams.get("key") ?? "";
    let song = load_song(songId);
    if (song) {
      console.log("load song:", song);
      setSearchQuery(song);
      const tmp = fromLinesToLineEditGroups(
        song.originalLyrics,
        song.newLyrics,
      );
      setLineEditGroups(tmp);
    } else {
      router.push("/");
    }
  }, [searchParams, router]);
  //TODO:Optimize the following
  const updateNewLyrics = useCallback(() => {
    //TODO:Make sure the new lyrics are with valid [] format
    const tmp: string = lineEditGroups
      .map((group) => {
        let tmp2 = squareLineFromTypeAndArgs(group.type, group.args) + "\n";
        // if (tmp2.at(-1) != "\n" && group.newLyrics[0] != "\n") tmp2 += "\n";
        return tmp2 + group.newLyrics;
      })
      .join("");
    console.log("lyrics:", tmp);
    setNewLyrics(tmp);
    const tmp2: SongDetails = { ...searchQuery, newLyrics: tmp };
    updateSearchQuery(tmp2);
  }, [lineEditGroups]); // eslint-disable-line
  const save = () => {
    updateNewLyrics();
  };
  return (
    <AppShellTemplate header="Editor">
      <Group>
        <Button onClick={save}>Save</Button>
      </Group>
      <Space h="md" />
      <Title order={3}>New lyrics</Title>
      <Space h="md" />
      <Stack key={"reloads:" + reloadCount}>
        {lineEditGroups.map((e: ILineEditsGroup, i: number) => {
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
      <Space h="md" />
      <AddButton
        addLyrics={(type, args) => {
          setLineEditGroups((prev) => {
            const newGroups = [...prev];
            newGroups.push({ type, args, newLyrics: "", originalLyrics: "" });
            console.log("newGroups:", newGroups, "type:", type);
            return newGroups;
          });
        }}
      />
    </AppShellTemplate>
  );
}
