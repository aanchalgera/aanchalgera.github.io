import { Router as ExpressRouter } from 'express';
import PostController from '../Controller/PostController';

let Router = module.exports = ExpressRouter();

Router
  .route('/post/:id')
  .post(PostController.updatePost)
  .get(PostController.getPost)
  .delete(PostController.deletePost)
;

Router
  .route('/posts/:blogName')
  .get(PostController.getPosts)
;
