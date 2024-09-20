/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

// Authenticate
export async function loginUser(
  prevState: string,
  formData: FormData
): Promise<string> {
  let err = false;
  try {
    await signIn("credentials", formData);
    return prevState;
  } catch (error) {
    if (error instanceof AuthError) {
      err = true;
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  } finally {
    if (err === false) {
      redirect("/games");
    }
  }
}

// TODO add validation checks
export async function registerUser(
  prevState: string,
  formData: FormData
): Promise<string> {
  const message = "Failed to create user";
  try {
    const body = JSON.stringify({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    });
    const res = await fetch(`${process.env.BACKEND_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message ?? message);
    }
  } catch (error: unknown) {
    return error instanceof Error ? error.message : message;
  }

  return await loginUser(prevState, formData);
}
