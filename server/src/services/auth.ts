import bcrypt from 'bcrypt';
import { getCustomRepository } from 'typeorm';

import JWTService from './jwt';
import { RegistrationRequest } from '../models/request';
import UserRepository from '../repository/user';
import { User } from '../models/entity/User';
import APIError from '../errors/APIError';

class AuthService {
  async login(email: string, password: string) {
    const user = await getCustomRepository(UserRepository)
      .findByEmail(email);

    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new APIError('Email ou senha inválidos', 400);
    }

    return new JWTService().generateAccessToken(user.id);
  }

  async register(registration: RegistrationRequest) {
    this.validateRegistration(registration);
    await this.validateEmail(registration.email)
      .catch((error) => Promise.reject(error));

    const user = new User();
    user.name = registration.name;
    user.email = registration.email;
    user.gender = registration.gender;
    user.uf = registration.uf;
    user.city = registration.city;
    user.password = bcrypt.hashSync(registration.password, 10);

    getCustomRepository(UserRepository).save(user);
  }

  private validateRegistration(registration: RegistrationRequest) {
    if (!registration.name || !registration.gender ||
      !registration.email || !registration.password) {
      throw new APIError('Um ou mais campos não foram preenchidos', 400);
    }
  }

  private async validateEmail(email: string) {
    const matchedUser = await getCustomRepository(UserRepository)
      .findByEmail(email);

    if (matchedUser) {
      throw new APIError('E-mail já está em uso', 400);
    }
  }
}

export default AuthService;
