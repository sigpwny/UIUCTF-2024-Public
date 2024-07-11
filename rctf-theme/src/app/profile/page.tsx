import { Suspense } from "react";
import { Metadata } from "next";
import { ProfileContext } from "./components";

export const metadata: Metadata = {
  title: 'Profile | UIUCTF 2024'
}

export default function Profile() {
  return (
    <Suspense>
      <ProfileContext />
    </Suspense>
  )
}