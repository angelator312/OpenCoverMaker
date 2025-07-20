"use client";

import { Provider } from "jotai";
import { JSX } from "react";

export const AtomProvider = ({ children }: { children: JSX.Element }) => {
  return <Provider>{children}</Provider>;
};
