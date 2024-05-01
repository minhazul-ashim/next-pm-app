import Members from "@/components/members/members";
import { listMembers } from "@/server/actions/members";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import React from "react";

const Page = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["list_members"],
    queryFn: listMembers,
  });
    return <HydrationBoundary state={dehydrate(queryClient)}>
      <Members />
  </HydrationBoundary>;
};

export default Page;
