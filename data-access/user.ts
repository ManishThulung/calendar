"use server";

import { ActionResponse } from "@/lib/server/response";
import { db } from "@/prisma";

export async function getUsers() {
  try {
    const users = await db.user.findMany();
    return ActionResponse.success({
      data: users,
      message: "success",
    });
  } catch (error) {
    throw error;
  }
}
