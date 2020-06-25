import express from 'express';

import VaseController from '../controllers/vase/vase';

const vaseController = new VaseController();
const vaseRoutes = express.Router();

vaseRoutes.get('/user/:userId', vaseController.index);

export default vaseRoutes;
