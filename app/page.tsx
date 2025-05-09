import { Logout } from "@/components/logout";
import Update from "@/components/test/update-name";
import { getUsers } from "@/data-access/user";
import { authOptions } from "@/lib/auth/auth-options";
import { getServerSession } from "next-auth";

const page = async () => {
  const session = await getServerSession(authOptions);
  const user = await getUsers();
  return (
    <>
      <Logout />
      <div>
        name: {session?.user.name}
        email: {session?.user.email}
      </div>
      all users: {JSON.stringify(user)}
      <Update />
    </>
  );
};

export default page;
