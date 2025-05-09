"use client";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export const Logout = () => {
  return (
    <div
      className="flex cursor-pointer gap-6"
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      <LogOut />
      Log out
    </div>
  );
};
