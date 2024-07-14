"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { register, login, setAuthToken } from "@/lib/rctf-client-api/auth";
import { ArrowButton } from "@/components/Button";
import Input from "@/components/Input";

interface RegisterState {
  name: string;
  email: string;
  verifySent: boolean;
  errors?: Record<string, any>;
  disabledButton: boolean;
  ctftimeToken?: string;
  ctftimeName?: string;
}
export default function Register() {
  // TODO: Add recaptcha support
  const recaptchaEnabled = false;

  const router = useRouter();
  const [registerState, setRegisterState] = useState<RegisterState>({
    name: "",
    email: "",
    verifySent: false,
    disabledButton: false
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // const recaptchaCode = recaptchaEnabled ? await requestRecaptchaCode() : undefined
    const recaptchaCode = undefined;

    setRegisterState({
      ...registerState,
      disabledButton: true
    })

    const res = await register({
      email: registerState.email,
      name: registerState.name,
      ctftimeToken: registerState.ctftimeToken,
      recaptchaCode
    })
    if (res?.registerSuccess) {
      router.push("/profile");
    }
    if (res?.verifySent) {
      setRegisterState({
        ...registerState,
        verifySent: true
      })
    }
    if (res?.errors) {
      setRegisterState({
        ...registerState,
        errors: res.errors
      })
    }
  }
  
  if (registerState.verifySent) {
    return (
      <div className="panel flex flex-col gap-4 max-w-prose mx-auto">
        <h1 className="font-bold text-4xl">
          Verify your email
        </h1>
        <p>
          A verification email has been sent to <strong>{registerState.email}</strong>. 
          Please check your inbox and spam folder.
        </p>
      </div>
    )
  }
  return (
    <div className="panel flex flex-col gap-4 max-w-prose mx-auto">
      <h1 className="font-bold text-4xl">
        Register for UIUCTF 2024
      </h1>
      <p>Please register one account per team.</p>
      <form
        className="flex flex-col gap-2"
        onSubmit={(e) => handleSubmit(e)}
      >
        <label className="flex flex-col gap-2">
          <span className="text-xl font-semibold">
            Team Name
          </span>
          <Input
            errors={registerState.errors}
            className="px-2 py-1 bg-surface-main focus-visible:ring-offset-4 focus-visible:ring-offset-surface-panel"
            autoFocus
            required
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            name="name"
            placeholder="Enter team name here"
            maxLength={64}
            minLength={2}
            type="text"
            value={registerState.name}
            onChange={(e) => setRegisterState({ ...registerState, name: e.target.value })}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-xl font-semibold">
            Email
          </span>
          <Input
            errors={registerState.errors}
            className="px-2 py-1 bg-surface-main focus-visible:ring-offset-4 focus-visible:ring-offset-surface-panel"
            required
            autoComplete="email"
            autoCorrect="off"
            autoCapitalize="off"
            name="email"
            placeholder="Enter email here"
            maxLength={64}
            minLength={2}
            type="email"
            value={registerState.email}
            onChange={(e) => setRegisterState({ ...registerState, email: e.target.value })}
          />
        </label>
        <ArrowButton className="mt-4" direction="e" type="submit" disabled={registerState.disabledButton}>
          Register
        </ArrowButton>
      </form>
    </div>
  )
}