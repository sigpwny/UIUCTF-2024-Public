"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { verify } from "@/lib/rctf-client-api/auth";
import { ArrowButton } from "@/components/Button";
import PendingToken from "@/components/PendingToken";

function VerifyElement() {
  const [pending, setPending] = useState(true);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [emailSet, setEmailSet] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const params = useSearchParams();

  const onVerifyClick = () => {
    if (params.has("token")) {
      const verifyEmail = async () => {
        const result = await verify({ verifyToken: params.get("token") });
        if (result.authToken) {
          setAuthToken(result.authToken);
        } else if (result.emailSet) {
          setEmailSet(true);
        } else {
          setError(result.verifyToken);
        }
        setPending(false);
      }
      verifyEmail();
    } else {
      setPending(false);
    }
  };

  return (
    <div className="panel flex flex-col gap-4 max-w-prose mx-auto">
      {error ? (
        <>
          <p className="font-bold text-4xl">
            Error
          </p>
          <p>
            {error}
          </p>
        </>
      ) : emailSet ? (
        <>
          <p className="font-bold text-4xl">
            Email change verified
          </p>
          <p>
            The email change has been verified. You can now close this page.
          </p>
        </>
      ) : authToken ? (
        <PendingToken authToken={authToken} />
      ) : pending ? (
        <>
          <p className="font-bold text-4xl">
            Verify
          </p>
          <p>
            Continue to complete your action.
          </p>
          <ArrowButton
            direction="e"
            onClick={() => onVerifyClick()}
          >
            Continue
          </ArrowButton>
        </>
      ) : (
        <>
          <p className="font-bold text-4xl">
            Invalid verification token
          </p>
          <p>
            The verification token is invalid or has expired.
          </p>
        </>
      )}
    </div>
  )
}

export default function Verify() {
  return (
    <Suspense>
      <VerifyElement />
    </Suspense>
  )
}