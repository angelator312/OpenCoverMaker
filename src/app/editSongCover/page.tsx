"use client";
import AppShellTemplate from "@/components/AppShellTemplate";
import { EasyEditOfLyrics } from "@/components/EasyEditOfLyrics";
import PasteButton from "@/components/PasteButton";
import SettingsOfSongCover from "@/components/SettingsOfSongCover";
import { GenreEnum } from "@/data/enums";
import { load_song, save_song } from "@/data/LocalStorageSave";
import { SongDetails } from "@/data/types";
import { makeSongKey } from "@/data/utils";
import {
  Group,
  TextInput,
  Space,
  Button,
  Textarea,
  Title,
  Center,
  Tooltip,
} from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function NewCoverPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [songDetails, setSongDetails] = useState<SongDetails>({
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
  useEffect(() => {
    const songId = searchParams.get("key") ?? "";
    let song = load_song(songId);
    if (song) {
      console.log("load song:", song);
      setSongDetails(song);
      setOriginalLyrics(song.originalLyrics);
      setKey(song.key);
    } else {
      router.push("/");
    }
  }, [searchParams, router]);
  const [originalLyrics, setOriginalLyrics] = useState("");
  const [key, setKey] = useState("");
  const save = () => {
    console.log(songDetails);
    save_song(songDetails);
    // Implement logic to create a new song cover using songDetails
  };
  useHotkeys([["ctrl+S", () => save()]], []);

  return (
    <AppShellTemplate>
      <Center>
        <Title>Edit Song cover</Title>
      </Center>
      <SettingsOfSongCover song={songDetails} setSong={setSongDetails} />
      <Space h="md" />
      <EasyEditOfLyrics
        originalLyrics={originalLyrics}
        setOriginalLyrics={setOriginalLyrics}
        label="Original Lyrics"
        description="Paste the original lyrics of the song" // Think about better description
      />
      <Space h="md" />
      <Group>
        <Tooltip label="Ctrl+S">
          <Button onClick={save}>Save Song Cover</Button>
        </Tooltip>
        <Button onClick={() => router.push("/editor?key=" + key)}>
          Edit Lyrics
        </Button>
      </Group>
    </AppShellTemplate>
  );
}
