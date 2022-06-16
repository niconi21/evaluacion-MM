import { Router } from "express";
import { PostController } from "../controllers/post.controller";
import { IResponse } from "../interfaces/response.interface";

export const POST_ROUTES = Router();

POST_ROUTES.post("/post", async (req, res) => {
  if (!req.body.title)
    return res.status(400).json({ error: "Title is required" });
  if (!req.body.content)
    return res.status(400).json({ error: "Content is required" });
  if (!req.body.author_id)
    return res.status(400).json({ error: "Author_id is required" });
  let response: IResponse = await PostController.createPost({
    title: req.body.title,
    content: req.body.content,
    author_id: req.body.author_id,
  });
  res.status(response.status).json(response.result);
});

POST_ROUTES.post("/post/:post_id/comment", async (req, res) => {
  if (!Number.isInteger(parseInt(req.params.post_id)))
    return res.status(400).json({ error: "post_id must be interger" });
  if (!req.body.content)
    return res.status(400).json({ error: "Content is required" });
  if (!req.body.author_id)
    return res.status(400).json({ error: "Author_id is required" });

  let response: IResponse = await PostController.createComment({
    content: req.body.content,
    author_id: req.body.author_id,
    post_id: parseInt(req.params.post_id),
  });
  res.status(response.status).json(response.result);
});

POST_ROUTES.get("/posts", async (req, res) => {
  let page = Number(req.query.page || "1");
  let width = Number(req.query.width || "5");
  let authorId = Number(req.query.authorId || -1);
  let response: IResponse = await PostController.getPosts(
    page,
    width,
    authorId
  );

  return res.status(response.status).json(response.result);
});

POST_ROUTES.get("/post/:id/comments", async (req, res) => {
  if (!Number.isInteger(parseInt(req.params.id)))
    return res.status(400).json({ error: "id must be interger" });

  let response: IResponse = await PostController.getComments(
    parseInt(req.params.id)
  );

  return res.status(response.status).json(response.result);
});
