import { Logout } from "@/components/logout";
import Update from "@/components/test/update-name";
import { authOptions } from "@/lib/auth/auth-options";
import { getServerSession } from "next-auth";

const page = async () => {
  const session = await getServerSession(authOptions);
  return (
    <>
      <Logout />

      <div>
        name: {session?.user.name}
        email: {session?.user.email}
      </div>

      <Update />
    </>
  );
};

export default page;
