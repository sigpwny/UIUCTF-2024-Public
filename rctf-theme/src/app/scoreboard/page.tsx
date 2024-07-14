import { Suspense } from "react";
import { Metadata } from "next";
import ScoreboardContext from "./components";

export const metadata: Metadata = {
  title: "Scoreboard | UIUCTF 2024"
}

export default function Scoreboard() {
  return (
    <Suspense>
      <ScoreboardContext />
    </Suspense>
  )
}