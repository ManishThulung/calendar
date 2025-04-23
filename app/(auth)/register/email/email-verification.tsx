"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export function EmailVerifcation() {
  const [timeLeft, setTimeLeft] = useState(120);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (timeLeft === 0) {
      setIsDisabled(false); // Enable button when timer ends
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer); // Cleanup timeout
  }, [timeLeft]);

  return (
    <div className="flex justify-center bg-gray-100">
      <div className="mx-auto flex min-h-screen w-full max-w-[1440px] flex-col items-center justify-center gap-6 px-16 py-10 md:gap-4 lg:w-2/3">
        <Image src={"/logo.svg"} alt={"logo"} width={90} height={70} />
        <div className="flex flex-col gap-4">
          <h1 className="text-center text-3xl font-extrabold md:text-4xl">
            Check Your Inbox
          </h1>
          <div>
            <p className="text-center text-sm font-extralight">
              Please verify your email by clicking on the link we sent at:
            </p>

            {/* <p className="text-center text-sm font-extralight text-blue-700 hover:underline hover:text-blue-800">
          try@gmail.com
        </p> */}
          </div>
        </div>
        <Image
          src={"/email.webp"}
          alt={"email"}
          width={280}
          height={280}
          className="md:h-[350] md:w-[500]"
        />
        <div className="flex w-full flex-col gap-3">
          <div className="flex items-center justify-center">
            <Button
              disabled={isDisabled}
              className="w-full cursor-pointer rounded-full bg-blue-700 md:w-[500]"
            >
              Resend Email
              {isDisabled ? `in ${timeLeft}s` : ""}
            </Button>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <p>Already verified?</p>
            <Link
              href="/login"
              className="text-blue-700 hover:text-blue-800 hover:underline"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
