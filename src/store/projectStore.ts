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
  filterByStatus: (status: "todo" | "inprogress" | "completed") => void;
  filterByAssignee: (id: number) => void;
  filterByDue: (status: string) => void;
  search: (search: string) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  project: {} as ProjectDetail,
  todos: [] as TaskDetail[],
  setTodos: (todos: TaskDetail[]) => set({ todos }),
  inProgress: [] as TaskDetail[],
  setInProgress: (inProgress: TaskDetail[]) => set({ inProgress }),
  completed: [] as TaskDetail[],
  setCompleted: (completed: TaskDetail[]) => set({ completed }),
  initializeStates: (project: ProjectDetail) =>
    set(() => ({
      project: project,
      todos: project?.tasks?.filter((task) => task.status === "todo"),
      inProgress: project?.tasks?.filter(
        (task) => task.status === "inprogress",
      ),
      completed: project?.tasks?.filter((task) => task.status === "completed"),
    })),
  search: (search: string) => {
    set((state) => ({
      todos: state.project.tasks?.filter(
        (el) => el.name.includes(search) && el.status === "todo",
      ),
      inProgress: state.project.tasks?.filter(
        (el) => el.name.includes(search) && el.status === "inprogress",
      ),
      completed: state.project.tasks?.filter(
        (el) => el.name.includes(search) && el.status === "completed",
      ),
    }));
  },
  filterByStatus: (status: "todo" | "inprogress" | "completed") => {
    set((state) => ({
      todos:
        status === "todo"
          ? state.project.tasks?.filter((el) => el.status === "todo")
          : [],
      inProgress:
        status === "inprogress"
          ? state.project.tasks?.filter((el) => el.status === "inprogress")
          : [],
      completed:
        status === "completed"
          ? state.project.tasks?.filter((el) => el.status === "completed")
          : [],
    }));
  },
  filterByAssignee: (id: number) => {
    set((state) => ({
      todos: state.project.tasks?.filter(
        (el) => el.assignedTo === id && el.status === "todo",
      ),
      inProgress: state.project.tasks?.filter(
        (el) => el.assignedTo === id && el.status === "inprogress",
      ),
      completed: state.project.tasks?.filter(
        (el) => el.assignedTo === id && el.status === "completed",
      ),
    }));
  },
  filterByDue: (status: string) => {
    if (status === "overdue") {
      set((state) => ({
        todos: state.project.tasks?.filter(
          (el) =>
            new Date(el.dueDate).getTime() < new Date().getTime() &&
            el.status === "todo",
        ),
        inProgress: state.project.tasks?.filter(
          (el) =>
            new Date(el.dueDate).getTime() < new Date().getTime() &&
            el.status === "inprogress",
        ),
        completed: state.project.tasks?.filter(
          (el) =>
            new Date(el.dueDate).getTime() < new Date().getTime() &&
            el.status === "completed",
        ),
      }));
    } else {
      set((state) => ({
        todos: state.project.tasks?.filter(
          (el) =>
            new Date(el.dueDate).getTime() > new Date().getTime() &&
            el.status === "todo",
        ),
        inProgress: state.project.tasks?.filter(
          (el) =>
            new Date(el.dueDate).getTime() > new Date().getTime() &&
            el.status === "inprogress",
        ),
        completed: state.project.tasks?.filter(
          (el) =>
            new Date(el.dueDate).getTime() > new Date().getTime() &&
            el.status === "completed",
        ),
      }));
    }
  },
}));
