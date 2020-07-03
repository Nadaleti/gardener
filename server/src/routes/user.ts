import express from 'express';

import UserController from '../controllers/user/user';
import VaseController from '../controllers/vase/vase';
import { verifyUserIdentity } from '../middlewares/userIdentity';

const userController = new UserController();
const vaseController = new VaseController();
const userRoutes = express.Router();

userRoutes.get('/:userId', verifyUserIdentity, userController.show);
userRoutes.patch('/:userId', verifyUserIdentity, userController.update);
userRoutes.get('/:userId/vase', verifyUserIdentity, vaseController.index);
userRoutes.post('/:userId/vase', verifyUserIdentity, vaseController.create);
userRoutes.get('/:userId/vase/:vaseId', verifyUserIdentity, vaseController.show);
userRoutes.patch('/:userId/vase/:vaseId', verifyUserIdentity, vaseController.update);
userRoutes.delete('/:userId/vase/:vaseId', verifyUserIdentity, vaseController.delete);

export default userRoutes;
