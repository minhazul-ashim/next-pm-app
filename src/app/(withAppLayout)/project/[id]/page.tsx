"use client";
import { useParams } from "next/navigation";

export default function Page() {
  const { id } = useParams();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      My Post
    </main>
  );
}
