"use server";

import { Project } from "@/types/type.project";
import axios, { AxiosResponse } from "axios";

export async function listProjects() {
  const { data }: AxiosResponse<Project[]> = await axios.get(
    "http://localhost:3000/api/projects/",
  );
  return data;
}

export async function singleProject(id: string) {
  const { data }: AxiosResponse<Project> = await axios.get(
    `http://localhost:3000/api/projects/?id=${id}`,
  );
  return data;
}

export async function createProject({ payload }: { payload: Project }) {
  const { data }: AxiosResponse<Project> = await axios.post(
    `http://localhost:3000/api/tasks/`,
    { ...payload },
  );
  return data;
}
