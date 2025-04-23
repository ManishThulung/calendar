import LoginForm from "@/app/(auth)/login/login-form";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth/auth-options";
import Image from "next/image";

const page = async () => {
  const session = await getServerSession(authOptions);

  if (session && session.user) {
    console.log(session, "session");
    redirect("/");
  }
  return (
    <div className="mx-auto flex h-screen max-w-[1440px] flex-row items-center justify-center gap-10 px-10 py-8 md:gap-4">
      <div className="sm:basis-1/2">
        <LoginForm />
      </div>

      <div className="hidden basis-1/2 items-center justify-center rounded-3xl bg-[url(/register-bg.png)] bg-cover p-8 sm:flex sm:flex-col">
        <div className="flex flex-col items-center justify-center">
          <div className="mt-6 flex flex-col items-center justify-center gap-2">
            <h1 className="text-center text-3xl text-white">
              Clicks Into {""}
              <span className="text-[#9BD9FF]">Connections</span>
            </h1>
            <p className="text-center font-extralight text-white">
              With Appsha, you can easily manage and share your links,
              portfolio, and contact details in one place, making it simple for
              others to connect with you.
            </p>
            <Image
              src="/onboard.png"
              width={380}
              height={380}
              alt="onboarding"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
