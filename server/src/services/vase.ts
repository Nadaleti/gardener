import { getCustomRepository } from 'typeorm';

import { Vase } from '../models/Vase';
import VaseRepository from '../repository/vase';

class VaseService {
  getByName(userId: number, vaseName: string): Promise<Vase[]> {
    return getCustomRepository(VaseRepository).findUserVasesByName(userId, vaseName);
  }
}

export default VaseService;
