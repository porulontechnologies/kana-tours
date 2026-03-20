import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const token = jwt.sign(
    { userId: (session.user as any).id, email: session.user?.email, role: (session.user as any).role },
    process.env.JWT_SECRET!,
    { expiresIn: "8h" }
  );

  return NextResponse.json({ token });
}
