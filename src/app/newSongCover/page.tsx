"use client";
import AppShellTemplate from "@/components/AppShellTemplate";
import { EasyEditOfLyrics } from "@/components/EasyEditOfLyrics";
import SettingsOfSongCover from "@/components/SettingsOfSongCover";
import { GenreEnum } from "@/data/enums";
import { saveSongDetails } from "@/data/LocalStorageSave";
import { SongDetails } from "@/data/types";
import { makeSongKey } from "@/data/utils";
import {
  Group,
  TextInput,
  Space,
  Button,
  Textarea,
  Title,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewCoverPage() {
  const router = useRouter();

  const [songDetails, setSongDetails] = useState<SongDetails>({
    newSongName: "",
    newArtist: "",
    newGenre: GenreEnum.Pop,
    newLyrics: "",
    originalArtist: "",
    originalLyrics: "",
    originalSongName: "",
    URLForLyrics: "",
    key: makeSongKey(25),
  });
  return (
    <AppShellTemplate>
      <Title>New Song cover</Title>
      <SettingsOfSongCover song={songDetails} setSong={setSongDetails} />
      <Space h="md" />
      <EasyEditOfLyrics
        originalLyrics={songDetails.originalLyrics}
        setOriginalLyrics={(e) =>
          setSongDetails({ ...songDetails, originalLyrics: e })
        }
        label="Original Lyrics"
        description="Paste the original lyrics of the song" // Think about better description
      />
      <Space h="md" />
      <Button
        onClick={() => {
          console.log(songDetails);
          saveSongDetails(songDetails);
          router.push("/editor?key=" + songDetails.key);
          // Implement logic to create a new song cover using songDetails
        }}
      >
        Create New Song Cover
      </Button>
    </AppShellTemplate>
  );
}
