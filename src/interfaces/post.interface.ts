import { IUser } from './user.interface';
export interface IPost {
  id?: number;
  title: string;
  content: string;
  author_id?: number;
  author?: IUser;
  createdAt?: string;
}
