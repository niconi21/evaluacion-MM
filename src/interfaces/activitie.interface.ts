export interface IActivitie {
  id: number;
  type: "post" | "comment";
  title?: string;
  content: string;
  createdAt: string;
}
