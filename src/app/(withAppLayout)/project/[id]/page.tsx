"use client";
import Tasks from "@/components/tasks/tasks";
import { singleProject } from "@/server/actions/projects";
import { useProjectStore } from "@/store/projectStore";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function Page() {
  const { id }: { id: string } = useParams();
  const { data, isSuccess } = useQuery({
    queryKey: ["singlePost", id],
    queryFn: () => singleProject(id),
  });
  const project = useProjectStore((state) => state.project);
  const setProject = useProjectStore((state) => state.initializeStates);
  if (isSuccess && !project.id) {
    setProject({ ...data });
  }
  return (
    <main className="min-h-screen">
      <Tasks />
    </main>
  );
}
