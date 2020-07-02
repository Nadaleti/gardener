import express from 'express';

import PlantTypeController from '../controllers/plant-type/plantType';

const plantTypeController = new PlantTypeController();
const plantTypeRoutes = express.Router();

plantTypeRoutes.get('/', plantTypeController.index);

export default plantTypeRoutes;
