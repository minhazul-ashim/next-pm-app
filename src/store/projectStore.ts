import { ProjectDetail } from "@/types/type.project";
import { TaskDetail } from "@/types/type.task";
import { create } from "zustand";

export interface ProjectState {
  project: ProjectDetail;
  todos: TaskDetail[];
  inProgress: TaskDetail[];
  completed: TaskDetail[];
  initializeStates: (by: ProjectDetail) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  project: {} as ProjectDetail,
  todos: [] as TaskDetail[],
  inProgress: [] as TaskDetail[],
  completed: [] as TaskDetail[],
  initializeStates: (project: ProjectDetail) =>
    set(() => ({
      project: project,
      todos: project?.tasks?.filter(task => task.isTodo),
      inProgress: project?.tasks?.filter(task => task.inProgress),
      completed: project?.tasks?.filter(task => task.isComplete)
    })),
}));
