import { NextResponse } from "next/server";
import fsPromises from "fs/promises";
import { Project } from "@/types/type.project";
import { Member } from "@/types/type.member";

export const GET = async () => {
  const projects = await fsPromises.readFile(
    process.cwd() + "/public/mocks/projects.json",
    "utf8",
  );
  const members = await fsPromises.readFile(
    process.cwd() + "/public/mocks/members.json",
    "utf8",
  );
  const parsedMembers = await JSON.parse(members);
  const parsedProjects = await JSON.parse(projects);
  const data = parsedProjects.map((el: Project) => {
    return {
      ...el,
      creator: parsedMembers.find((member: Member) => el.id == member.id),
    };
  });
  return NextResponse.json(data);
};
