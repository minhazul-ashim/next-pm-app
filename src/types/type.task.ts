export type Task = {
  id: number;
  name: string;
  status: string;
  isTodo: boolean;
  isComplete: boolean;
  inProgress: boolean;
  projectId: number;
  createdAt: Date;
  updatedAt: Date;
  assignedTo: number;
  dueDate: Date;
};