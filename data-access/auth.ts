"use server";

import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { db } from "@/prisma";
import { Prisma } from "@prisma/client";
import { registrationSchema } from "@/shema/auth/auth-schema";
import { z } from "zod";
import { revalidatePath } from "next/cache";
// import { sendMail } from "@/lib/functions/email";
// import { IEmailPayload } from "@/types/custom";

export async function register({
  data,
}: {
  data: z.infer<typeof registrationSchema>;
}) {
  try {
    const result = registrationSchema.safeParse(data);
    if (!result.success) {
      return NextResponse.json({ error: "Invalid input", status: 400 });
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const userExists = await db.user.count({
      where: {
        email: data.email.toLowerCase(),
      },
    });

    if (userExists) {
      return NextResponse.json(
        { error: "Email already exist" },
        { status: 400 }
      );
    }

    await db.user.create({
      data: {
        username: data.username,
        email: data.email.toLowerCase(),
        password: hashedPassword,
      },
    });

    // const token = generateToken({
    //   id: user.id,
    //   email: user.email,
    // });

    // const verifyLink = `${process.env.NEXTAUTH_URL}/email/verify/${token}`;
    // const emailVerifyPayload: IEmailPayload = {
    //   to: user.email,
    //   title: "Verify your appsha account",
    //   body: `Hey ${
    //     user.name.split(" ")[0]
    //   }, <br />To verify your email please <a href='${verifyLink}'>click this link</a>. <br /> If this was not you, please ignore this email.`,
    // };
    // await sendMail(emailVerifyPayload);

    return NextResponse.json({ message: "Check your email to verify" });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return NextResponse.json(
          { error: "Email already exist" },
          { status: 400 }
        );
      }
    }
    throw err;
  }
}

export async function updateUserEmail(email: string) {
  try {
    await db.user.update({
      where: {
        id: "532eecc6-7574-48f2-b062-ead767cc2daf",
      },
      data: {
        email: email.toLowerCase(),
      },
    });
    revalidatePath("/", "layout");
    return { success: true };
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return NextResponse.json(
          { error: "Email already exist" },
          { status: 400 }
        );
      }
    }
    throw err;
  }
}
