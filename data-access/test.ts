"use server";

import { ActionResponse } from "@/lib/server/response";
// import { sendMail } from "@/lib/functions/email";
// import { IEmailPayload } from "@/types/custom";

export async function test() {
  try {
    // const result = { name: "hii" };
    // return NextResponse.json(result, { status: 200 });
    return ActionResponse.success({
      data: [{ name: "hii" }],
      message: "success",
    });
  } catch (error) {
    console.log(error, "errprrrrrrrrrr");
    throw error;
  }
}
