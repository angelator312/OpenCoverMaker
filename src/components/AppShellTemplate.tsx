"use client";
import { AppShell, Burger, Center, Group, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { MenuForEditor } from "./StatsMenuForEditor";
export default function AppShellTemplate({
  children,
  header = "",
  is_in_editor = false,
}: {
  header?: string;
  children: React.ReactNode;
  is_in_editor?: boolean;
}) {
  const [opened, { toggle }] = useDisclosure(false);
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { desktop: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} />
          <Title>OpenCoverMaker {header}</Title>
          {is_in_editor && <MenuForEditor />}
          {/* <MantineLogo size={30} /> */}
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Link href="/">Main Page</Link>
        <Link href="/newSongCover">New Song cover</Link>
        {/* <Link href="/catalogue">Catalogue</Link> */}
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
