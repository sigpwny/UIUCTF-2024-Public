"use server";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { redirect } from "next/navigation";
 
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  let foundError = false;
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      foundError = true;
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  } finally {
    if (!foundError) {
      redirect('/admin');
    }
  }
}