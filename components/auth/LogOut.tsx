"use client";

import { signOut } from "next-auth/react";

export const LogOut = async () => {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "http://localhost:3000/login" })}
    >
      LogOut
    </button>
  );
};
