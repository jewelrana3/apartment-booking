import { userModal } from "@/models/user-model";
import { dbConnect } from "@/service/mongos";
import { NextResponse } from "next/server";
import * as bcrypt from "bcrypt-ts";

export const POST = async (request) => {
  const { fname, lname, email, password } = await request.json();

  await dbConnect();

  const hashedPassword = await bcrypt.hash(password, 5);
  console.log(hashedPassword, "chekc");

  const newUser = {
    name: `${fname} ${lname}`,
    email,
    password: hashedPassword,
  };

  try {
    await userModal.create(newUser);
    return new NextResponse("user has been created", {
      status: 201,
    });
  } catch (err) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};
