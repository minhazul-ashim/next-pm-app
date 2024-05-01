import { NextRequest, NextResponse } from "next/server";
import fsPromises from "fs/promises";

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const tasks = await fsPromises.readFile(
      process.cwd() + "/public/mocks/tasks.json",
      "utf8",
    );
    const parsedTasks = JSON.parse(tasks);
    const reqBody = await req.json();
    parsedTasks.push({ id: parsedTasks.length + 1, ...reqBody });
    await fsPromises.writeFile(
      process.cwd() + "/public/mocks/tasks.json",
      JSON.stringify(parsedTasks),
    );
    return NextResponse.json(reqBody);
  } catch (e) {
    return NextResponse.json({ success: false });
  }
};
