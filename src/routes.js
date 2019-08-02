import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import MeetappController from './app/controllers/MeetappController';
import MeetappSubscriptionController from './app/controllers/MeetappSubscriptionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.get('/meetapp', MeetappController.index);
routes.post('/meetapp', MeetappController.store);
routes.put('/meetapp/:id', MeetappController.update);
routes.delete('/meetapp/:id', MeetappController.destroy);

routes.post('/meetapp/:id/subscription', MeetappSubscriptionController.store);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
