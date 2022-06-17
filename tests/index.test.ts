import request from "supertest";
import { App } from "../src/configs/app.config";
import { users, getPosts, countPosts, getComments } from "./data";
import { IPost } from "../src/interfaces/post.interface";
import { IComment } from "../src/interfaces/comment.interface";
import { IActivitie } from '../src/interfaces/activitie.interface';

let server = new App();
let posts: IPost[] = [];
let comments: IComment[] = [];
describe("Creation of info", () => {
  test("Create 6 users with status code 200", async () => {
    let userRegistred = 0;
    for await (const user of users) {
      let response = await request(server.app)
        .post("/user")
        .send({ email: user.email });
      user.id = response.body.id;
      if (response.statusCode == 200) userRegistred++;
    }
    expect(userRegistred).toBe(users.length);
  });

  test("Create 10 posts of user with status code 200", async () => {
    let postsRegistred: number = 0;
    for (const user of users) {
      let userposts = getPosts(user.id!);
      for await (const post of userposts) {
        let response = await request(server.app).post("/post").send({
          authorId: post.author_id,
          title: post.title,
          content: post.content,
        });
        if (response.statusCode == 200) {
          postsRegistred++;
          post.id = response.body.id;
          posts.push(post);
        }
      }
    }
    expect(postsRegistred).toBeGreaterThanOrEqual(
      users.length * countPosts - (users.length * countPosts) / 2
    );
  });

  test("Create 1 comment for post of all users with status code 200", async () => {
    let commentsRegistred: number = 0;
    for (const user of users) {
      let commentsUser = getComments(user.id!, posts);
      for await (const comment of commentsUser) {
        let response = await request(server.app)
          .post(`/post/${comment.post_id}/comment`)
          .send({
            authorId: comment.author_id,
            content: comment.content,
          });
        if (response.statusCode == 200) {
          commentsRegistred++;
          comment.id = response.body.id;
          comments.push(comment);
        }
      }
    }
    expect(commentsRegistred).toBeGreaterThanOrEqual(
      users.length * countPosts * users.length -
        (users.length * countPosts * users.length) / 2
    );
  });
});

describe("Actions of endpoints", () => {
  test(`GET /posts - First 2 posts of first user`, async () => {
    let response = await request(server.app)
      .get(`/posts?page=1&width=5&authorId=${users[0].id}`)
      .send();
    let postsResponse: IPost[] = [];
    if (response.statusCode == 200) {
      postsResponse = response.body.items;
    }
    expect(postsResponse.length).toBe(2);
  });

  test(`GET /post/:id/comments - All comments of first posts`, async () => {
    let response = await request(server.app)
      .get(`/post/${posts[0].id}/comments`)
      .send();
    let commentResponse: IComment[] = [];
    if (response.statusCode == 200) {
      commentResponse = response.body;
    }
    expect(commentResponse.length).toBe(users.length);
  });

  test(`GET /author/:id/activities -  Activitie of last user`, async () => {
      let response = await request(server.app)
      .get(`/author/${users[users.length - 1].id}/activities`)
      .send();
    let activitiesResponse: IActivitie[] = [];
    if (response.statusCode == 200) {
      activitiesResponse = response.body;
    }
    expect(activitiesResponse.length).toBe(countPosts*users.length + countPosts);
  });
});
