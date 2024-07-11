"use client";
import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { login, setAuthToken } from "@/lib/rctf-client-api/auth";
import { Link } from "next-view-transitions";
import { ArrowButton } from "@/components/Button";
import Input from "@/components/Input";
import PendingToken from "@/components/PendingToken";

interface LoginState {
  teamToken: string;
  errors?: Record<string, any>;
  disabledButton: boolean;
  ctftimeToken?: string;
  ctftimeName?: string;
}

// TODO: Add CTFtime login support (or not)
function LoginForm() {
  const [loginState, setLoginState] = useState<LoginState>({
    teamToken: "",
    disabledButton: false,
  });
  const [pending, setPending] = useState(true);
  const [pendingAuthToken, setPendingAuthToken] = useState<string | undefined>(undefined);
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (params.has("token")) {
      setPending(true);

      const attemptLogin = async () => {
        const result = await login({
          teamToken: params.get("token"),
          ctftimeToken: undefined,
        });

        if (result.authToken) {
          setPendingAuthToken(result.authToken);
        }
        setPending(false);
      }
      attemptLogin();
    } else {
      setPending(false);
    }
  }, [params]);

  // TODO: Fix any type
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoginState({
      ...loginState,
      disabledButton: true,
    });

    let teamToken = loginState.teamToken;
    try {
      const url = new URL(teamToken)
      if (url.searchParams.has("token")) {
        teamToken = url.searchParams.get("token") as string;
      }
    } catch {}

    const attemptLogin = async () => {
      const result = await login({
        teamToken,
        ctftimeToken: undefined,
      });
      if (result.authToken) {
        setAuthToken({ authToken: result.authToken });
        router.push("/profile");
        return;
      }
      setLoginState({
        ...loginState,
        errors: result,
        disabledButton: false
      })
    }
    attemptLogin();
  }

  return (
    <div className="panel flex flex-col gap-4 max-w-prose mx-auto">
      {pending ? (
        <p className="font-bold text-4xl">
          Loading...
        </p>
      ) : (pendingAuthToken ? (
        <PendingToken authToken={pendingAuthToken} />
      ) : (
        <>
          <h1 className="font-bold text-4xl">
            Log in to UIUCTF 2024
          </h1>
          <form
            className="flex flex-col gap-2"
            onSubmit={(e) => handleSubmit(e)}
          >
            <label className="flex flex-col gap-2">
              <span className="text-xl font-semibold">
                Team Token
              </span>
              <Input
                errors={loginState.errors}
                className="px-2 py-1 bg-surface-main focus-visible:ring-offset-4 focus-visible:ring-offset-surface-panel"
                autoFocus
                required
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                name="teamToken"
                placeholder="Enter Team Token here"
                type="text"
                value={loginState.teamToken}
                onChange={(e) => {setLoginState({...loginState, teamToken: e.target.value})}}
              />
            </label>
            <Link href="/recover" className="w-fit mb-4">
              Lost your team token?
            </Link>
            <ArrowButton direction="e" type="submit" disabled={loginState.disabledButton}>
              Log in
            </ArrowButton>
          </form>
        </>
      ))}
    </div>
  )
}

export default function LoginPage() {
  return (
    <>
      <Suspense>
        <LoginForm />
      </Suspense>
    </>
  )
}