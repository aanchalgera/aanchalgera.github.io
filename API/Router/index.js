import { Router as ExpressRouter } from 'express';
import PostController from '../Controller/PostController';

let Router = module.exports = ExpressRouter();

Router
  .route('/post/:id')
  .put(PostController.putPost)
;
