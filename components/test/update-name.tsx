"use client";

import { updateUserEmail } from "@/data-access/auth";
// import { unstable_update } from "@/lib/auth/auth-options";
import { useSession } from "next-auth/react";

export default function Update() {
  const { data: session, status, update } = useSession();

  const handleUpdate = async () => {
    const email = "update@gmail.com";
    try {
      await updateUserEmail(email);
      const result = await update({
        user: {
          ...session?.user,
          email,
        },
      });

      console.log("Update result:", result);
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  // if (status === "authenticated") {
  return (
    <>
      <p>Signed in as {session?.user.email}</p>

      {/* Update the value by sending it to the backend. */}
      <button onClick={handleUpdate}>Edit email</button>
      {/*
       * Only trigger a session update, assuming you already updated the value server-side.
       * All `useSession().data` references will be updated.
       */}
      {/* <button onClick={() => update()}>Edit name</button> */}
    </>
  );
  // }

  // return <a href="/api/auth/signin">Sign in</a>;
}
