"use server";

import { Task } from "@/types/type.task";
import axios, { AxiosResponse } from "axios";

export async function createTask({ payload }: { payload: Task }) {
  const { data }: AxiosResponse<Task> = await axios.post(
    `${process.env.BASE_URL}/api/tasks/`,
    { ...payload },
  );
  return data;
}

export async function updateTask({ payload }: { payload: Task }) {
  const { data }: AxiosResponse<Task> = await axios.put(
    `${process.env.BASE_URL}/api/tasks/`,
    { ...payload },
  );
  return data;
}

export async function deleteTask(id: number) {
  const { data }: AxiosResponse<Task> = await axios.delete(
    `${process.env.BASE_URL}/api/tasks/?id=${id}`,
  );
  return data;
}
