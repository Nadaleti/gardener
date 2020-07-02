import { getCustomRepository } from 'typeorm';

import UserRepository from '../repository/user';
import { UserUpdateRequest } from '../models/request';
import APIError from '../errors/APIError';

class UserService {
  getUser(id: number) {
    return getCustomRepository(UserRepository)
      .findOne({id: id});
  }

  getUserByEmail(email: string) {
    return getCustomRepository(UserRepository)
      .findByEmail(email);
  }

  async updateUser(userId: number, request: UserUpdateRequest) {
    const user = await this.getUser(userId);

    if (!user) {
      throw new APIError('User not found', 400);
    }

    user.gender = request.gender || user.gender;
    user.name = request.name || user.name;
    user.email = request.email || user.email;
    user.city = request.city || user.city;
    user.uf = request.uf || user.uf;

    await getCustomRepository(UserRepository).save(user);
  }
}

export default UserService;
