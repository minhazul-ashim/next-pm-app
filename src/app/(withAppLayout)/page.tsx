import Projects from "@/components/dashboard/projects";
import { listProjects } from "@/server/actions/projects";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";

export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["list_projects"],
    queryFn: listProjects,
  });
  return (
    <main className="min-h-screen p-lg">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Projects />
      </HydrationBoundary>
    </main>
  );
}
