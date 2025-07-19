"use client";
import { AppShell, Burger, Center, Group, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
export default function AppShellTemplate({
  children,
  header = "",
}: {
  header?: string;
  children: React.ReactNode;
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
          <Center>
            <Title>OpenCoverMaker {header}</Title>
          </Center>
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
