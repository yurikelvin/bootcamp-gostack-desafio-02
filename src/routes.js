import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import RecipientController from './app/controllers/RecipientController';

import authMiddleware, { authAdmin } from './app/middlewares/auth';
import ValidatorMiddleware from './app/middlewares/validator';

const routes = new Router();

routes.post(
  '/users',
  ValidatorMiddleware.validateNewUser,
  UserController.store
);
routes.post(
  '/sessions',
  ValidatorMiddleware.validateSession,
  SessionController.store
);

routes.use(authMiddleware);
routes.use(authAdmin);
routes.post(
  '/recipients',
  ValidatorMiddleware.validateNewRecipient,
  RecipientController.store
);

export default routes;
