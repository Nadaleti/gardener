import { Request, Response, NextFunction } from 'express';

import VaseService from '../../services/vase';
import APIError from '../../errors/APIError';

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

  show(request: Request, response: Response, next: NextFunction) {
    const vaseId = Number.parseInt(request.params['vaseId']);

    vaseService.getVase(vaseId)
      .then((vase) => {
        if (!vase) {
          next(new APIError('Vase not found', 400));
          return;
        }

        response.status(200).json({
          id: vase.id,
          location: vase.location,
          name: vase.name,
          plantType: vase.plantType
        });
      })
      .catch((error) => { next(error) });
  }

  create(request: Request, response: Response, next: NextFunction) {
    const userId = Number.parseInt(request.params['userId']);

    vaseService.createVase(userId, request.body)
      .then(() => { response.status(201).send() })
      .catch((error) => { next(error) });
  }

  update(request: Request, response: Response, next: NextFunction) {
    const vaseId = Number.parseInt(request.params['vaseId']);

    vaseService.updateVase(vaseId, request.body)
      .then(() => { response.status(200).send() })
      .catch((error) => { next(error) });
  }

  delete(request: Request, response: Response, next: NextFunction) {
    const vaseId = Number.parseInt(request.params['vaseId']);

    vaseService.deleteVase(vaseId)
      .then(() => { response.status(200).send() })
      .catch((error) => { next(error) });
  }
}

export default VaseController;
