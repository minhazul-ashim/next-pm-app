"use server";

import { Member } from "@/types/type.member";
import axios, { AxiosResponse } from "axios";

export const register = async ({ payload }: { payload: Member }) => {
  const res: AxiosResponse<Member> = await axios.post(
    `${process.env.BASE_URL}/api/auth/register`,
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
    `${process.env.BASE_URL}/api/auth/login`,
    { ...payload },
  );
  return res;
};
