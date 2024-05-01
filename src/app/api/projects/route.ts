import { NextRequest, NextResponse } from "next/server";
import fsPromises from "fs/promises";
import { Project } from "@/types/type.project";
import { Member } from "@/types/type.member";
import { Task } from "@/types/type.task";

export const getSingleProject = async (params: string) => {
  try {
    const projects = await fsPromises.readFile(
      process.cwd() + "/public/mocks/projects.json",
      "utf8",
    );
    const members = await fsPromises.readFile(
      process.cwd() + "/public/mocks/members.json",
      "utf8",
    );
    const tasks = await fsPromises.readFile(
      process.cwd() + "/public/mocks/tasks.json",
      "utf8",
    );
    const parsedMembers = JSON.parse(members);
    const parsedProjects = JSON.parse(projects);
    const parsedTasks = JSON.parse(tasks);

    const project = parsedProjects.find(
      (el: Project) => parseInt(params) === el.id,
    );

    const creator = parsedMembers.find(
      (member: Member) => project.id == member.id,
    );
    const tasksForProject = parsedTasks
      .filter((task: Task) => project.id == task.projectId)
      .map((task: Task) => {
        const assignee = parsedMembers.find(
          (member: Member) => task.assignedTo == member.id,
        );
        return { ...task, assignee };
      });

    const data = {
      ...project,
      creator,
      tasks: tasksForProject,
    };

    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ success: false });
  }
};

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const params = req?.url?.split("?")[1]?.split("=")[1];
    if (params) {
      const project = await getSingleProject(params);
      return project;
    }
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
  } catch (e) {
    return NextResponse.json({ success: false });
  }
};

export const PUT = async (req: NextRequest, res: NextResponse) => {
  try {
    const projects = await fsPromises.readFile(
      process.cwd() + "/public/mocks/projects.json",
      "utf8",
    );
    const parsedProjects = JSON.parse(projects);
    const { id, ...rest } = await req.json();
    console.log(id);
    const index = parsedProjects.findIndex(
      (project: Project) => project.id == id,
    );
    parsedProjects[index] = { id, ...rest };
    await fsPromises.writeFile(
      process.cwd() + "/public/mocks/projects.json",
      JSON.stringify(parsedProjects),
    );
    return NextResponse.json(parsedProjects);
  } catch (e) {
    return NextResponse.json({ success: false });
  }
};

export const DELETE = async (req: NextRequest, res: NextResponse) => {
  try {
    const params = req?.url?.split("?")[1]?.split("=")[1];
    const projects = await fsPromises.readFile(
      process.cwd() + "/public/mocks/projects.json",
      "utf8",
    );
    const parsedprojects = JSON.parse(projects);
    const taskIndex = parsedprojects.findIndex(
      (task: Task) => task.id.toString() == params,
    );
    parsedprojects.splice(taskIndex, 1);
    await fsPromises.writeFile(
      process.cwd() + "/public/mocks/projects.json",
      JSON.stringify(parsedprojects),
    );
    return NextResponse.json(parsedprojects);
  } catch (e) {
    return NextResponse.json({ success: false });
  }
};

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    try {
      const projects = await fsPromises.readFile(
        process.cwd() + "/public/mocks/projects.json",
        "utf8",
      );
      const parsedProjects = JSON.parse(projects);
      const reqBody = await req.json();
      parsedProjects.push({ id: parsedProjects.length + 1, ...reqBody });
      await fsPromises.writeFile(
        process.cwd() + "/public/mocks/projects.json",
        JSON.stringify(parsedProjects),
      );
      return NextResponse.json(reqBody);
    } catch (e) {
      return NextResponse.json({ success: false });
    }
  } catch (e) {
    return NextResponse.json({ success: false });
  }
};
