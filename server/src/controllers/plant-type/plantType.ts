import { Request, Response } from 'express';

import { PlantTypeMap } from './plantTypeMapper';

class PlantTypeController {
  index(request: Request, response: Response) {
    const plantTypes = [];
    const basePath = process.env.BASE_PATH || '';

    for (const plantType of PlantTypeMap.entries()) {
      plantTypes.push({
        ...plantType[1],
        iconPath: basePath + plantType[1].iconPath,
        value: plantType[0]
      });
    }

    response.status(200).json(plantTypes);
  }
}

export default PlantTypeController;
