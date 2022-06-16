import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { IResponse } from "../interfaces/response.interface";

export const USER_ROUTES = Router();

USER_ROUTES.post("/user", async (req, res) => {
  if (!req.body.email)
    return res.status(400).json({ error: "Email is required" });
  let response: IResponse = await UserController.createUser({
    email: req.body.email,
  });
  return res.status(response.status).json(response.result);
});

USER_ROUTES.get("/author/:id/activities", async (req, res) => {
  if (!Number.isInteger(parseInt(req.params.id)))
    return res.status(400).json({ error: "Id author must be interger" });
  if (!req.params.id)
    return res.status(400).json({ error: "Id author is required" });

  let response: IResponse = await UserController.getAuthorActivities(
    parseInt(req.params.id)
  );
  return res.status(response.status).json(response.result.activities);
});
