import { Router as ExpressRouter } from 'express';
import PostController from '../Controller/PostController';

let Router = module.exports = ExpressRouter();
//export default Router = ExpressRouter();

Router
  .route('/post/:id')
  .put(PostController.putPost)
;
