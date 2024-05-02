"use server";

import { Member } from "@/types/type.member";
import axios, { AxiosResponse } from "axios";

export async function listMembers() {
  const { data }: AxiosResponse<Member[]> = await axios.get(
    `${process.env.BASE_URL}/api/members/`,
  );
  return data;
}
