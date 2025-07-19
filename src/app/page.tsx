"use client";
import AppShellTemplate from "@/components/AppShellTemplate";
import { get_songs } from "@/data/LocalStorageSave";
import { Stack } from "@mantine/core";
import Link from "next/link";

export default function HomePage() {
  const songs = get_songs();
  return (
    <AppShellTemplate>
      <div>Home page</div>
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
