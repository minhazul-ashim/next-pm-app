"use client";
import Tasks from "@/components/tasks/tasks";
import { singleProject } from "@/server/actions/projects";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function Page() {
  const { id }: { id: string } = useParams();
  const { data } = useQuery({
    queryKey: ["singlePost", id],
    queryFn: () => singleProject(id),
  });
  return (
    <main className="min-h-screen p-lg">
      <Tasks data={data} />
    </main>
  );
}
