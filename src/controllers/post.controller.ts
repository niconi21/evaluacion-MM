import { IResponse } from "../interfaces/response.interface";
import { PostModel } from "../models/post.model";
import { IPost } from "../interfaces/post.interface";
import { IComment } from "../interfaces/comment.interface";
import { CommentModel } from "../models/comment.model";
import { UserModel } from "../models/user.model";
export class PostController {
  public static async createPost(data: IPost): Promise<IResponse> {
    try {
      let post = await PostModel.create(data);
      return { ok: true, status: 200, result: { id: post.id } };
    } catch (error) {
      return {
        ok: false,
        status: 400,
        result: { error: error.errors[0].message },
      };
    }
  }

  public static async createComment(data: IComment): Promise<IResponse> {
    try {
      let comment = await CommentModel.create(data);
      return { ok: true, status: 200, result: { id: comment.id } };
    } catch (error) {
      return { ok: false, status: 400, result: { error: error.parent.code } };
    }
  }

  public static async getPosts(
    page: number,
    width: number,
    author_id: number
  ): Promise<IResponse> {
    try {
      let posts: PostModel[] = [];
      if (author_id == -1) posts = await PostModel.findAll();
      else
        posts = await PostModel.findAll({
          where: { $author_id$: author_id },
        });
      let pages: number = Math.ceil(posts.length / width);

      if (page > 0 && page > pages)
        return { ok: false, status: 400, result: { error: "Page outside" } };

      posts = posts.slice(page * width - width, page * width);

      let items = await Promise.all(
        posts.map<Promise<IPost>>(async (post) => {
          return {
            id: post.id,
            title: post.title,
            content: post.content,
            createdAt: post.created_at.toISOString(),
            author: await (await post.getUser()).get(),
          };
        })
      );

      return { ok: true, status: 200, result: { pages, page, width, items } };
    } catch (error) {
      return { ok: false, status: 400, result: { error: error } };
    }
  }

  public static async getComments(id: number): Promise<IResponse> {
    try {
      let commentsDB = await CommentModel.findAll({
        where: {
          $post_id$: id,
        },
        include: { model: UserModel, as: "user" },
      });

      let comments = commentsDB.map<IComment>((comment) => ({
        id: comment.id,
        content: comment.content,
        createdAt: comment.created_at,
        author: {
          id: comment.user!.id,
          email: comment.user!.email,
        },
      }));

      return {
        ok: true,
        status: 200,
        result: { comments },
      };
    } catch (error) {
      console.log(error);
      return { ok: false, status: 400, result: { error: error } };
    }
  }
}
