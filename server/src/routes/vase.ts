import express from 'express';

import VaseController from '../controllers/vase/vase';
import { verifyUserIdentity } from '../middlewares/userIdentity';

const vaseController = new VaseController();
const vaseRoutes = express.Router();

vaseRoutes.get('/user/:userId/vase', verifyUserIdentity, vaseController.index);
vaseRoutes.post('/user/:userId/vase', verifyUserIdentity, vaseController.create);

export default vaseRoutes;
