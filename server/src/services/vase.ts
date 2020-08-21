import { getCustomRepository } from 'typeorm';

import { Vase } from '../models/entity';
import VaseRequest from '../models/request/vaseRequest';
import VaseRepository from '../repository/vase';
import APIError from '../errors/APIError';
import UserService from './user';
import { getByPlantType } from '../models/enum/plantType.enum';

const userService = new UserService();

class VaseService {
  getVase(vaseId: number) {
    return getCustomRepository(VaseRepository).findOne(vaseId);
  }
  
  getByName(userId: number, vaseName: string) {
    return getCustomRepository(VaseRepository).findUserVasesByName(userId, vaseName);
  }

  async createVase(userId: number, request: VaseRequest) {
    this.validateVaseRequest(request);

    const plantType = getByPlantType(request.plantType);

    if (!plantType) {
      throw new APIError('Tipo de planta inválido', 400);
    }

    const vase = new Vase();
    vase.name = request.name;
    vase.location = request.location;
    vase.plantType = plantType;

    return await userService.getUser(userId)
      .then((user) => {
        if (!user) {
          return Promise.reject(new APIError('Usuário não encontrado', 400));
        }

        vase.user = user
        return getCustomRepository(VaseRepository).save(vase);
      });
  }

  async updateVase(vaseId: number, vase: VaseRequest) {
    const matchedVase = await getCustomRepository(VaseRepository).findOne(vaseId);

    if (!matchedVase) {
      throw new APIError('Vaso não encontrado', 400);
    }

    matchedVase.name = vase.name || matchedVase.name;
    matchedVase.location = vase.location || matchedVase.location;
    matchedVase.plantType = getByPlantType(vase.plantType) || matchedVase.plantType;

    await getCustomRepository(VaseRepository).save(matchedVase);
  }

  async deleteVase(vaseId: number) {
    await getCustomRepository(VaseRepository).findOne(vaseId)
      .then((vase) => {
        if (!vase) throw new APIError('Vaso não encontrado', 400)
      });

    await getCustomRepository(VaseRepository).delete(vaseId);
  }

  private validateVaseRequest(request: VaseRequest) {
    if (!request.name || !request.location || !request.plantType) {
      throw new APIError('Um ou mais campos não foram preenchidos', 400);
    }
  }
}

export default VaseService;
