"use client";
import { useFormStatus, useFormState } from "react-dom";
import { authenticate } from "@/lib/actions";

export default function LoginPage() {
  const [state, formAction] = useFormState(
    authenticate,
    undefined
  );

  const { pending } = useFormStatus();

  return (
    <>
      <div className="max-w-prose mx-auto flex flex-col gap-4">
        <p className="text-2xl font-bold">
          Login
        </p>
        <form action={formAction} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1">
            <span>Username</span>
            <input
              type="username"
              id="username"
              name="username"
              placeholder="Enter your username"
              required
              minLength={3}
            />
          </label>
          <label className="flex flex-col gap-1">
            <span>Password</span>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              required
              minLength={10}
            />
          </label>
          <button type="submit" disabled={pending}>
            Log in
          </button>
          {state ? (
            <span className="text-sm text-red-500">
              {state}
            </span>
          ) : null}
        </form>
      </div>
    </>
  )
}