import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { setAuthToken } from "@/lib/rctf-client-api/auth";
import { pendingPrivateProfile } from "@/lib/rctf-client-api/profile";
import { ArrowButton } from "@/components/Button";

export default function PendingToken({ authToken }) {
  const [user, setUser] = useState(null)
  const router = useRouter();
  useEffect(() => {
    (async () => {
      if (!authToken) {
        return
      }
      const user = await pendingPrivateProfile({ authToken })
      setUser(user)
    })()
  }, [authToken]);
  const handleLoginClick = useCallback(() => {
    setAuthToken({ authToken });
    router.push("/profile");
  }, [router, authToken]);
  if (!user) {
    return null
  }
  return (
    <>
      <h1 className="font-bold text-4xl">Log in to UIUCTF 2024</h1>
      <p>
        You will be logged in as <strong>{user.name}</strong>.
      </p>
      <ArrowButton direction="e" onClick={handleLoginClick}>
        Log in
      </ArrowButton>
    </>
  );
}