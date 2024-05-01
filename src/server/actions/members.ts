"use server";

import { Member } from "@/types/type.member";
import axios, { AxiosResponse } from "axios";

export async function listMembers() {
  const { data }: AxiosResponse<Member[]> = await axios.get(
    "http://localhost:3000/api/members/",
  );
  return data;
}