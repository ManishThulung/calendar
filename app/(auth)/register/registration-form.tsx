"use client";

import Image from "next/image";
import type React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { register } from "@/data-access/auth";
import { registrationSchema } from "@/shema/auth/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
// import { toast } from "sonner";

function SubmitButton({
  children,
  isSubmitting,
}: {
  children: React.ReactNode;
  isSubmitting: boolean;
}) {
  return (
    <Button
      type="submit"
      className="w-full rounded-full px-4 py-6 cursor-pointer"
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Submitting...
        </>
      ) : (
        children
      )}
    </Button>
  );
}

export function RegistrationForm() {
  const form = useForm<z.infer<typeof registrationSchema>>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const [isView, setIsView] = useState(false);

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(data: z.infer<typeof registrationSchema>) {
    try {
      await register({ data });
    } catch (error: any) {
      // toast.error(error.res.data.message);
      console.log(error, "registration error");
    }
  }

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <Image
        src={"/logo.svg"}
        alt={"logo"}
        width={140}
        height={100}
        className=""
      />
      <Card className="mx-auto w-full max-w-lg p-0 md:p-8">
        <CardHeader>
          <CardTitle className="mb-4 font-bold sm:text-center sm:text-4xl">
            Create Account
          </CardTitle>
          {/* <CardDescription>
            Get started by entering your details below.
          </CardDescription> */}
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="John Doe"
                        {...field}
                        className="p-5"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="john@gmail.com"
                        className="p-5"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={isView ? "text" : "password"}
                          placeholder="*******"
                          className="w-full p-5 pr-10" // Added `w-full` and `pr-10`
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          onClick={() => setIsView(!isView)}
                        >
                          {isView ? (
                            <Eye className="h-5 w-5" />
                          ) : (
                            <EyeOff className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <SubmitButton isSubmitting={isSubmitting}>
                Create Account
              </SubmitButton>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-center text-sm md:text-start">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-700 hover:text-blue-800 hover:underline"
            >
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
