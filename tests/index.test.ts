import axios from "axios";
import { App } from "../src/configs/app.config";
import { getUsers } from "./data.test";
import { IResult } from "../src/interfaces/response.interface";

describe("server online", async () => {
  let app = new App();
  let isOnlie = await app.startServer();
  expect(isOnlie).toBeTruthy();
});

describe("created users", async () => {
  let users = await getUsers();
  let i = 0;
  users.forEach(async (user) => {
    let resp = await axios.post<IResult>("http://localhost:3000/user", {
      email: user.email,
    });
    if (resp.data.id) i++;
  });
  expect(users.length).toBeGreaterThan(1);
});
