"use client";
import AppShellTemplate from "@/components/AppShellTemplate";
import PasteButton from "@/components/PasteButton";
import { GenreEnum } from "@/data/enums";
import { save_song } from "@/data/LocalStorageSave";
import { SongDetails } from "@/data/types";
import { makeSongKey } from "@/data/utils";
import { Group, TextInput, Space, Button, Textarea } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewCoverPage() {
  const router = useRouter();

  const [originalLyrics, setOriginalLyrics] = useState("");
  const [newSongName, setNewSongName] = useState("");
  const [newArtistName, setNewArtistName] = useState("");
  const [originalArtistName, setOriginalArtistName] = useState("");
  const [originalSongName, setOriginalSongName] = useState("");
  const [URLForLyrics, setURLForLyrics] = useState("");
  const [newGenre, setNewGenre] = useState(GenreEnum.Pop);
  const [key, setKey] = useState(makeSongKey(25));
  return (
    <AppShellTemplate>
      <h1>New Song cover</h1>
      <Group>
        <TextInput
          value={originalSongName}
          onChange={(e) => setOriginalSongName(e.target.value)}
          label="Name of the original song"
          description="Input the name of the original song."
        />
        <TextInput
          value={newSongName}
          onChange={(e) => setNewSongName(e.target.value)}
          label="Name of the new song"
          description="Input the name of the new song."
        />
        <TextInput
          value={URLForLyrics}
          onChange={(e) => setURLForLyrics(e.target.value)}
          label="URL for lyrics"
          description="Paste URL for lyrics."
          placeholder="genius.com or azlyrics.com/ "
          disabled
        />
      </Group>
      <Space h="md" />
      <Group>
        <Textarea
          value={originalLyrics}
          onChange={(e) => setOriginalLyrics(e.target.value)}
          label="Original Lyrics"
          description="Paste the original lyrics of the song" // Think about better description
          autosize
          resize="both"
        />
        <PasteButton onPasteClicked={(e) => setOriginalLyrics(e)} />
      </Group>
      <Space h="md" />
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
          router.push("/editor?key=" + key);
          // Implement logic to create a new song cover using songDetails
        }}
      >
        Create New Song Cover
      </Button>
    </AppShellTemplate>
  );
}
