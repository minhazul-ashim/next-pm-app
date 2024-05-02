import { NextRequest, NextResponse } from "next/server";
import fsPromises from "fs/promises";
import { Member } from "@/types/type.member";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const reqBody = await req.json();
    const members = await fsPromises.readFile(
      process.cwd() + "/public/mocks/members.json",
      "utf8",
    );
    const parsed = JSON.parse(members);
    const auth = parsed.find((el: Member) => el.email === reqBody.email);
    console.log(auth);
    if (auth.password === reqBody.password) {
      return NextResponse.json(auth);
    } else {
      return NextResponse.json({ success: false });
    }
  } catch (e) {
    return NextResponse.json({ success: false });
  }
}
