import { Member } from "./type.member";

export type Project = {
  id: number;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  creator?: Member;
};
