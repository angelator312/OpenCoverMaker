"use client";
import { Suspense } from "react";

export default function Layout({ children }: { children: any }) {
  return <Suspense>{children}</Suspense>;
}
