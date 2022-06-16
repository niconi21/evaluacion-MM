import { Router } from "express";
import { USER_ROUTES } from '../routes/user.routes';
import { POST_ROUTES } from '../routes/post.routes';

export const APP_ROUTES = Router();


APP_ROUTES.use('/',USER_ROUTES);
APP_ROUTES.use('/',POST_ROUTES);