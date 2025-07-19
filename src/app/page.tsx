import AppShellTemplate from "@/components/AppShellTemplate";
import { get_songs } from "@/data/LocalStorageSave";
import { Stack } from "@mantine/core";

export default function HomePage() {
  const songs = get_songs();
  return (
    <AppShellTemplate>
      <div>Home page</div>
      <Stack>
        {songs.map((song) => (
          <div key={song.key}>
            {song.newSongName} by {song.newArtist} cover of{" "}
            {song.originalSongName} by {song.originalArtist}
          </div>
        ))}
      </Stack>
    </AppShellTemplate>
  );
}
