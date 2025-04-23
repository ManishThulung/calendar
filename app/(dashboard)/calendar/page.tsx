"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const page = () => {
  // const session = await getServerSession(authOptions);
  // if (!session || !session.user) {
  //   redirect("/login");
  // }

  const res = {
    data: [{ name: "hii" }],
    message: "success",
    status: "error",
  };
  // showActionResponse(res);
  const notify = () => toast.success("sdfsfsdfsdf");
  console.log(res);
  return (
    <div>
      calendar page
      <Button onClick={notify}>shddi</Button>
    </div>
  );
};

export default page;
