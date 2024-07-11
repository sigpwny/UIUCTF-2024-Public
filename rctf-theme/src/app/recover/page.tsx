"use client";
import { useState } from "react";
import { recover } from "@/lib/rctf-client-api/auth";
import { ArrowButton } from "@/components/Button";
import Input from "@/components/Input";

export default function Recover() {
  const [disabled, setDisabled] = useState(false);
  const [errors, setErrors] = useState<Record<string, any>>({});
  const [verifySent, setVerifySent] = useState(false);
  const [email, setEmail] = useState("");
  // const requestRecaptchaCode = useRecaptcha("recover");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // const recaptchaCode = await requestRecaptchaCode?.();
    const recaptchaCode = undefined;
    setDisabled(true);
    const res = await recover({
      email,
      recaptchaCode,
    });
    if (res?.errors) {
      setErrors(res.errors);
    }
    if (res?.verifySent) {
      setVerifySent(res.verifySent);
    }
    setDisabled(false);
  };

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  return (
    <div className="panel flex flex-col gap-4 max-w-prose mx-auto">
      {verifySent ? (
        <>
          <h1 className="font-bold text-4xl">
            Recovery email sent
          </h1>
          <p>
            Please check your email for the login link. You may need to check 
            your spam folder.
          </p>
        </>
      ) : (
        <>
          <h1 className="font-bold text-4xl">
            Recover your UIUCTF 2024 account
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              errors={errors}
              className="px-2 py-1 bg-surface-main focus-visible:ring-offset-4 focus-visible:ring-offset-surface-panel"
              autoFocus
              required
              autoComplete="email"
              autoCorrect="off"
              autoCapitalize="off"
              name="email"
              placeholder="Enter email here"
              type="email"
              value={email}
              onChange={(e) => handleEmailChange(e)}
            />
            <ArrowButton
              direction="e"
              type="submit"
              className="btn"
              disabled={disabled}
            >
              Recover
            </ArrowButton>
          </form>
        </>
      )}
    </div>
  )
}