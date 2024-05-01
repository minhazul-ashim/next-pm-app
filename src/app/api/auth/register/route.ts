import { NextRequest, NextResponse } from "next/server";
import fsPromises from "fs/promises";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const reqBody = await req.json();
    const members = await fsPromises.readFile(
      process.cwd() + "/public/mocks/members.json",
      "utf8",
    );
    const parsed = JSON.parse(members);
    parsed.push({ id: parsed.length + 1, ...reqBody });
    await fsPromises.writeFile(
      process.cwd() + "/public/mocks/members.json",
      JSON.stringify(parsed),
    );
    return NextResponse.json({ id: parsed.length + 1, ...reqBody });
  } catch (e) {
    return NextResponse.json({ success: false });
  }
}
