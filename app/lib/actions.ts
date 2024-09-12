/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

// Authenticate
export async function loginUser(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

// TODO add validation checks
export async function registerUser(prevState: string, formData: FormData) {
  try {
    const body = JSON.stringify({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    });
    const user = await fetch(`${process.env.BACKEND_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    }).then((res) => {
      return res.json();
    });

    if (user.messages) {
      throw new Error(user.messages);
    }
  } catch (error) {
    return "Failed to create user";
  }

  try {
    await signIn("credentials", formData);
    return prevState;
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}
