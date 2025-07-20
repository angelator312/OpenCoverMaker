"use client";
import AppShellTemplate from "@/components/AppShellTemplate";
import { get_songs } from "@/data/LocalStorageSave";
import { SongDetails } from "@/data/types";
import { Stack, Title } from "@mantine/core";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [songs, setSongs] = useState<SongDetails[]>([]);
  useEffect(() => {
    const storedSongs = get_songs();
    if (storedSongs) {
      setSongs(storedSongs);
    }
  }, [localStorage]);
  return (
    <AppShellTemplate>
      <Title>Home page</Title>
      <Stack>
        {songs.map((song) => (
          <Link href={`/editor?key=${song.key}`} key={song.key}>
            {song.newSongName} by {song.newArtist} cover of{" "}
            {song.originalSongName} by {song.originalArtist}
          </Link>
        ))}
      </Stack>
    </AppShellTemplate>
  );
}
