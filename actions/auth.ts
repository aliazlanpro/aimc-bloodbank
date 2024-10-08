"use server";

import { signIn, signOut } from "@/auth";
import { redirects } from "@/lib/constants";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export const signInWithGoogle = async () => {
  try {
    await signIn("google", {
      redirectTo: redirects.afterLogin,
    });
  } catch (error) {
    // Signin can fail for a number of reasons, such as the user
    // not existing, or the user not having the correct role.
    // In some cases, you may want to redirect to a custom error
    if (error instanceof AuthError) {
      return redirect(`/login?error=${error.type}`);
    }

    // Otherwise if a redirects happens Next.js can handle it
    // so you can just re-thrown the error and let Next.js handle it.
    // Docs:
    // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
    throw error;
  }
};

export async function logOut() {
  await signOut({ redirectTo: redirects.afterLogout });
}
