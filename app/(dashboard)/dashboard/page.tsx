import { test } from "@/data-access/test";
import { authOptions } from "@/lib/auth/auth-options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect("/login");
  }
  console.log(session.user);

  const res = await test();
  console.log(res);
  return <div>page</div>;
};

export default page;
