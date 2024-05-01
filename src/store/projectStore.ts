import { ProjectDetail } from "@/types/type.project";
import { TaskDetail } from "@/types/type.task";
import { create } from "zustand";

export interface ProjectState {
  project: ProjectDetail;
  todos: TaskDetail[];
  setTodos: (by: TaskDetail[]) => void;
  inProgress: TaskDetail[];
  setInProgress: (by: TaskDetail[]) => void;
  completed: TaskDetail[];
  setCompleted: (by: TaskDetail[]) => void;
  initializeStates: (by: ProjectDetail) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  project: {} as ProjectDetail,
  todos: [] as TaskDetail[],
  setTodos: (todos: TaskDetail[]) => set({ todos }),
  inProgress: [] as TaskDetail[],
  setInProgress: (todos: TaskDetail[]) => set({ todos }),
  completed: [] as TaskDetail[],
  setCompleted: (todos: TaskDetail[]) => set({ todos }),
  initializeStates: (project: ProjectDetail) =>
    set(() => ({
      project: project,
      todos: project?.tasks?.filter((task) => task.isTodo),
      inProgress: project?.tasks?.filter((task) => task.inProgress),
      completed: project?.tasks?.filter((task) => task.isComplete),
    })),
}));
