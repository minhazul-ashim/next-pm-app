import { Member } from "./type.member";
import { TaskDetail } from "./type.task";

export interface Project {
  id: number;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: number
};

export interface ProjectDetail extends Project {
  creator?: Member;
  tasks?: TaskDetail[];
}