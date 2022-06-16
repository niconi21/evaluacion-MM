import { Router } from "express";

export const USER_ROUTES = Router();

USER_ROUTES.post('/user', (req, res)=>{
    return res.send('POST /user')
})
USER_ROUTES.post('/author/:id/activities', (req, res)=>{
    return res.send('POST /activities')
})