import { UserModel } from "../models/user.model";
import { IResult, IResponse } from "../interfaces/response.interface";
import { IUser } from "../interfaces/user.interface";
import { CommentModel } from "../models/comment.model";
import { IActivitie } from "../interfaces/activitie.interface";
export class UserController {
  public static async createUser(data: IUser): Promise<IResponse> {
    try {
      let user = await UserModel.create(data);
      return { ok: true, status: 200, result: { id: user.id } };
    } catch (error) {
      return {
        ok: false,
        status: 400,
        result: { error: error.errors[0].message },
      };
    }
  }

  public static async getAuthorActivities(id: number): Promise<IResponse> {
    try {
      let user = await UserModel.findByPk(id);
      if (!user)
        return { ok: false, status: 400, result: { error: "User not exists" } };
      let posts = await user.getPosts();
      let comments = await CommentModel.findAll({
        where: { author_id: user.id },
      });
      let activities = [
        ...posts.map<IActivitie>((post) => ({
          id: post.id,
          title: post.title,
          content: post.content,
          createdAt: post.created_at.toISOString(),
          type: "post",
        })),
        ...comments.map<IActivitie>((post) => ({
          id: post.id,
          content: post.content,
          createdAt: post.created_at.toISOString(),
          type: "comment",
        })),
      ];
      return { ok: true, status: 200, result: { activities } };
    } catch (error) {
      return { ok: false, status: 400, result: { error: "User not exists" } };
    }
  }
}
