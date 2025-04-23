"use client";

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
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";
// import { toast } from "sonner";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { z } from "zod";
import { loginSchema } from "@/shema/auth/auth-schema";
import SubmitButton from "@/components/ui/submit-button";

function LoginForm() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [isView, setIsView] = useState(false);

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(data: z.infer<typeof loginSchema>) {
    const { username, password } = data;
    try {
      await signIn("credentials", {
        username,
        password,
        redirect: false,
      });
    } catch (error: any) {
      throw error;
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
            Welcome back
          </CardTitle>
          {/* <CardDescription>
            Get started by entering your details below.
          </CardDescription> */}
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="p= space-y-4"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="p-5"
                        type="username"
                        placeholder="john@example.com"
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
                    <FormDescription className="flex w-full justify-end">
                      <Link
                        href="/forget-password"
                        className="mt-1 text-blue-700 hover:text-blue-800 hover:underline"
                      >
                        Forgot password
                      </Link>
                    </FormDescription>
                  </FormItem>
                )}
              />

              <SubmitButton isSubmitting={isSubmitting}>Log in</SubmitButton>
            </form>
          </Form>

          {/* <button onClick={() => signIn("google")}>Sign in with Google</button> */}
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-center text-sm md:text-start">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-blue-700 hover:text-blue-800 hover:underline"
            >
              Register
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default LoginForm;
