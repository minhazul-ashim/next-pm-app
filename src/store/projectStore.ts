import { ProjectDetail } from "@/types/type.project";
import { create } from "zustand";

interface ProjectState {
  project: ProjectDetail;
  setProject: (by: ProjectDetail) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  project: {} as ProjectDetail,
  setProject: (project: ProjectDetail) =>
    set(() => ({
      project: project,
    })),
}));
