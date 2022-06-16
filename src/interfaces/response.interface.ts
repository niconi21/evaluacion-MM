import { IActivitie } from './activitie.interface';
import { IPost } from './post.interface';
import { IComment } from './comment.interface';
export interface IResponse {
  ok: boolean;
  status: number
  result: IResult
}

export interface IResult{
  id?: number;
  error?: string;
  activities?: IActivitie[]
  pages?: number;
  page?:number;
  width?: number;
  items?: IPost[];
  comments?: IComment[];
}