"use server";

import { Member } from "@/types/type.member";

export const register = async ({ payload }: { payload: Member }) => {
  const res = await fetch(`${process.env.BASE_URL}/api/auth/register`, {
    method: "POST",
    cache: "no-store",
    body: JSON.stringify({ ...payload }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
};

export const login = async ({
  payload,
}: {
  payload: { email: string; password: string };
}) => {
  const res = await fetch(`${process.env.BASE_URL}/api/auth/login`, {
    method: "POST",
    cache: "no-store",
    body: JSON.stringify({ ...payload }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
};
