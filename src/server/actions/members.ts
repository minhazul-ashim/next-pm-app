"use server";

export async function listMembers() {
  const res = await fetch(
    `${process.env.BASE_URL}/api/members/`, {
      method: 'GET',
    cache: 'no-store',
    }
  );
  
  const data = await res.json();
  return data;
}
