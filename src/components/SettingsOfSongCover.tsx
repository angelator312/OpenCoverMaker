import { SongDetails } from "@/data/types";
import { Group, TextInput } from "@mantine/core";

export default function SettingsOfSongCover({
  song,
  setSong,
}: {
  song: SongDetails;
  setSong: (song: SongDetails) => void;
}) {
  return (
    <Group>
      <TextInput
        value={song.originalSongName}
        onChange={(e) => setSong({ ...song, originalSongName: e.target.value })}
        label="Name of the original song"
        description="Input the name of the original song."
      />
      <TextInput
        value={song.newSongName}
        onChange={(e) => setSong({ ...song, newSongName: e.target.value })}
        label="Name of the new song"
        description="Input the name of the new song."
      />
      <TextInput
        value={song.URLForLyrics}
        onChange={(e) => setSong({ ...song, URLForLyrics: e.target.value })}
        label="URL for lyrics"
        description="Paste URL for lyrics."
        placeholder="genius.com or azlyrics.com/ "
        disabled
      />
    </Group>
  );
}
