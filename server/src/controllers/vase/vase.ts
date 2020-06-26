import { Request, Response, NextFunction } from 'express';

import VaseService from '../../services/vase';

const vaseService = new VaseService();

class VaseController {
  index(request: Request, response: Response, next: NextFunction) {
    const userId = Number.parseInt(request.params['userId']);
    const vaseName = request.query['name'];

    vaseService.getByName(userId, vaseName as string)
      .then((vases) => {
        const vasesResponse = vases
          .map((vase) => {
            return {
              id: vase.id,
              location: vase.location,
              name: vase.name,
              plantType: vase.plantType
            }
          })
        response.status(200).json(vasesResponse)
      })
      .catch((error) => { next(error) });
  }

  create(request: Request, response: Response, next: NextFunction) {
    const userId = Number.parseInt(request.params['userId']);

    vaseService.createVase(userId, request.body)
      .then(() => { response.status(201).send() })
      .catch((error) => { next(error) });
  }
}

export default VaseController;
