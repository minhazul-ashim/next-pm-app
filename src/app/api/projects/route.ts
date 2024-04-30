import { NextResponse } from "next/server";
import fsPromises from "fs/promises";

export const GET = async () => {
  const projects = await fsPromises.readFile(
    process.cwd() + "/public/mocks/projects.json",
    "utf8",
  );
  return NextResponse.json(JSON.parse(projects));
};
