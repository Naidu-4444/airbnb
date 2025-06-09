import { prisma } from "@/utils/prisma";
import { hash } from "keyhasher";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const { name, email, password } = body;
  const hashed = hash(password);
  if (!name || !email || !password) {
    return NextResponse.json("Please provide all the details", { status: 400 });
  }
  try {
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        hashedPassword: hashed,
      },
    });
    return NextResponse.json(user, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(e.message, { status: 400 });
  }
}
