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
} from "@mantine/core";
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
      setNewSongName(song.newSongName);
      setNewArtistName(song.newArtist);
      setOriginalArtistName(song.originalArtist);
      setOriginalSongName(song.originalSongName);
      setURLForLyrics(song.URLForLyrics);
      setNewGenre(song.newGenre);
      setKey(song.key);
    } else {
      router.push("/");
    }
  }, [searchParams, router]);
  const [originalLyrics, setOriginalLyrics] = useState("");
  const [newSongName, setNewSongName] = useState("");
  const [newArtistName, setNewArtistName] = useState("");
  const [originalArtistName, setOriginalArtistName] = useState("");
  const [originalSongName, setOriginalSongName] = useState("");
  const [URLForLyrics, setURLForLyrics] = useState("");
  const [newGenre, setNewGenre] = useState(GenreEnum.Pop);
  const [key, setKey] = useState("");
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
        <Button
          onClick={() => {
            let songDetails: SongDetails = {
              originalSongName,
              originalArtist: originalArtistName,
              newSongName,
              URLForLyrics,
              originalLyrics,
              newLyrics: originalLyrics,
              newArtist: newArtistName,
              newGenre,
              key,
            };
            console.log(songDetails);
            save_song(songDetails);
            // Implement logic to create a new song cover using songDetails
          }}
        >
          Save Song Cover
        </Button>
        <Button onClick={() => router.push("/editor?key=" + key)}>
          Edit Lyrics
        </Button>
      </Group>
    </AppShellTemplate>
  );
}
