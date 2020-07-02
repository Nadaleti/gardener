import { Request, Response } from 'express';

import { PlantType, PlantTypeMap } from './plantTypeMapper';

class PlantTypeController {
  index(request: Request, response: Response) {
    const plantTypes: PlantType[] = [];
    PlantTypeMap.forEach((plantType) => {
      plantType.iconPath = process.env.BASE_PATH + plantType.iconPath;
      plantTypes.push(plantType);
    });

    response.status(200).json(plantTypes);
  }
}

export default PlantTypeController;
