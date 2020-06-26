import { getCustomRepository } from 'typeorm';

import UserRepository from '../repository/user';

class UserService {
  getUser(id: number) {
    return getCustomRepository(UserRepository)
      .findOne({id: id});
  }

  getUserByEmail(email: string) {
    return getCustomRepository(UserRepository)
      .findByEmail(email);
  }
}

export default UserService;
