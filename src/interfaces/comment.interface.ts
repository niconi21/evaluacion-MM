import { IUser } from './user.interface';
export interface IComment {
  id?: number;
  content: string;
  createdAt?: Date;
  post_id?: number;
  author_id?: number;
  author?: IUser
}
