import { Group, TextInput } from "@mantine/core";
const regex_for_use = /\[(.*?):(.*)\]/g;
export default function SquareBracketLineEdit({
  new_lyrics,
  setNewLyrics,
  setAutoFocus,
  autoFocus = false,
}: {
  new_lyrics: string;
  autoFocus?: boolean;
  setNewLyrics: (e: string) => void;
  setAutoFocus: (e: number) => void;
}) {
  let match = regex_for_use.exec(new_lyrics);
  if (!match) return "Error";
  const what = match.slice(1)[0];
  const value = match.slice(1)[1];
  console.log(what, ":", value);
  return (
    <Group grow>
      <TextInput
        autoFocus={autoFocus}
        onKeyUp={(e) => {
          if (e.key.startsWith("Enter")) setAutoFocus(-1);
        }}
        value={what}
        onChange={(e) => setNewLyrics(e.currentTarget.value)}
        // inputSize="100"
      />
    </Group>
  );
}
