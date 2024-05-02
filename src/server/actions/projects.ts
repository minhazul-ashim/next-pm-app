"use server";

import { Project } from "@/types/type.project";

export async function listProjects() {
  const res = await fetch(`${process.env.BASE_URL}/api/projects/`, {
    method: "GET",
    cache: "no-store",
  });
  const data = await res.json();
  return data;
}

export async function singleProject(id: string) {
  const res = await fetch(`${process.env.BASE_URL}/api/projects/?id=${id}`, {
    method: "GET",
  });
  const data = await res.json();
  return data;
}

export async function createProject({ payload }: { payload: Project }) {
  const res = await fetch(`${process.env.BASE_URL}/api/projects/`, {
    method: "POST",
    cache: "no-store",
    body: JSON.stringify({ ...payload }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
}

export async function updateProject({ payload }: { payload: Project }) {
  const res = await fetch(`${process.env.BASE_URL}/api/projects/`, {
    method: "PUT",
    cache: "no-store",
    body: JSON.stringify({ ...payload }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
}

export async function deleteProject(id: number) {
  const res = await fetch(`${process.env.BASE_URL}/api/projects/?id=${id}`, {
    method: "DELETE",
    cache: "no-store",
  });
  const data = await res.json();
  return data;
}
