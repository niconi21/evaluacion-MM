import { Router } from "express";

export const POST_ROUTES = Router();

POST_ROUTES.post('/post', (req,res)=>{
    return res.send('POST /post')
})

POST_ROUTES.get('/posts', (req,res)=>{
    return res.send('get /posts')
})

POST_ROUTES.get('/post/:id/comments', (req,res)=>{
    return res.send('get /comments')
})