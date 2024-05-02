"use server";

import { Task } from "@/types/type.task";

export async function createTask({ payload }: { payload: Task }) {
  const res = await fetch(`${process.env.BASE_URL}/api/tasks/`, {
    method: "POST",
    cache: 'no-store',
    body: JSON.stringify({ ...payload }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json()
  return data;
}

export async function updateTask({ payload }: { payload: Task }) {
  const res = await fetch(`${process.env.BASE_URL}/api/tasks/`, {
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

export async function deleteTask(id: number) {
  const res = await fetch(
    `${process.env.BASE_URL}/api/tasks/?id=${id}`, {
      method: 'DELETE',
    cache: 'no-store',
    }
  );
  const data = await res.json();
  return data;
}
