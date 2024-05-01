import { NextRequest, NextResponse } from "next/server";
import fsPromises from "fs/promises";

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const members = await fsPromises.readFile(
      process.cwd() + "/public/mocks/members.json",
      "utf8",
    );
    const reqBody = await req.json();
    const parsedMembers = JSON.parse(members);
    parsedMembers.push({ id: parsedMembers.length + 1, ...reqBody });
    await fsPromises.writeFile(
      process.cwd() + "/public/mocks/members.json",
      JSON.stringify(parsedMembers),
    );
    return NextResponse.json(reqBody);
  } catch (e) {
    return NextResponse.json({ success: false });
  }
};

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const members = await fsPromises.readFile(
      process.cwd() + "/public/mocks/members.json",
      "utf8",
    );
    const parsedMembers = JSON.parse(members);
    return NextResponse.json(parsedMembers);
  } catch (e) {
    return NextResponse.json({ success: false });
  }
};
