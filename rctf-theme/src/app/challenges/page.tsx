import { Suspense } from "react";
import { Metadata } from "next";
import ChallengesContext from "./components";

export const metadata: Metadata = {
  title: "Challenges | UIUCTF 2024"
}

export default function Challenges() {
  return (
    <Suspense>
      <ChallengesContext />
    </Suspense>
  )
}