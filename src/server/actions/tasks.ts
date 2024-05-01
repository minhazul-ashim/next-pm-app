"use server";

import { Task } from "@/types/type.task";
import axios, { AxiosResponse } from "axios";

export async function createTask({ payload }: { payload: Task }) {
  const { data }: AxiosResponse<Task> = await axios.post(
    `http://localhost:3000/api/tasks/`,
    { ...payload },
  );
  return data;
}

export async function updateTask({ payload }: { payload: Task }) {
  const { data }: AxiosResponse<Task> = await axios.put(
    `http://localhost:3000/api/tasks/`,
    { ...payload },
  );
  return data;
}
