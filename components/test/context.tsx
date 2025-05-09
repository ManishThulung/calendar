"use client";

import { SessionProvider } from "next-auth/react";
// import { Elements } from '@stripe/react-stripe-js'
// import { loadStripe } from "@stripe/stripe-js";
// Makes AuthProtectedClient accessible in all client components
// adding stripe's provider also here

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

function WithNextAuthSession({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}

export default WithNextAuthSession;
