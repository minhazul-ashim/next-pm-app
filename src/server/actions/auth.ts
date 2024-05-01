"use server"

import { Member } from "@/types/type.member";
import axios, { AxiosResponse } from "axios";

export const register = async ({ payload }: { payload: Member }) => {
  const res: AxiosResponse<Member> = await axios.post(
    `http://localhost:3000/api/auth/register`,
    { ...payload },
  );
  return res;
};

export const login = async ({
  payload,
}: {
  payload: { email: string; password: string };
}) => {
  const res: AxiosResponse<Member> = await axios.post(
    `http://localhost:3000/api/auth/login`,
    { ...payload },
  );
  return res;
};
