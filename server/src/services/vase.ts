import { getCustomRepository } from 'typeorm';

import { Vase } from '../models/Vase';
import VaseRepository from '../repository/vase';
import APIError from '../errors/APIError';
import UserService from './user';

const userService = new UserService();

class VaseService {
  getByName(userId: number, vaseName: string) {
    return getCustomRepository(VaseRepository).findUserVasesByName(userId, vaseName);
  }

  async createVase(userId: number, request: VaseRequest) {
    this.validateVaseRequest(request);

    const vase = new Vase();
    vase.name = request.name;
    vase.location = request.location;
    vase.plantType = request.plantType;

    return await userService.getUser(userId)
      .then((user) => {
        if (!user) {
          return Promise.reject(new APIError('User not found', 400));
        }

        vase.user = user
        return getCustomRepository(VaseRepository).save(vase);
      });
  }

  private validateVaseRequest(request: VaseRequest) {
    if (!request.name || !request.location || !request.plantType) {
      throw new APIError('Some of the required fields are\'t filled', 400);
    }
  }
}

export default VaseService;
