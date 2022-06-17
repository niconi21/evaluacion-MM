import { IUser } from "../src/interfaces/user.interface";
import { IPost } from "../src/interfaces/post.interface";
import { IComment } from "../src/interfaces/comment.interface";
export const users: IUser[] = [
  { id: 0, email: "morenodurann@gmail.com" },
  { id: 0, email: "manuel@gmail.com" },
  { id: 0, email: "lizzie@gmail.com" },
  { id: 0, email: "ivan@gmail.com" },
  { id: 0, email: "martin@gmail.com" },
  { id: 0, email: "karina@gmail.com" },
];

export const countPosts = 5;

export const getPosts = (id: number) => {
  return new Array(countPosts).fill(0).map<IPost>((x, index) => ({
    id: 0,
    title: `post ${index + 1} of user no. ${id}`,
    content: `content of user no. ${id}`,
    author_id: id,
  }));
};

export const getComments = (author_id: number, posts: IPost[]) => {
  return new Array(users.length * countPosts)
    .fill(0)
    .map<IComment>((x, index) => ({
      id: 0,
      content: `Comment of user no. ${author_id}`,
      author_id,
      post_id: posts[index].id
    }));
};
