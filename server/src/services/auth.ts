import bcrypt from 'bcrypt';
import { getCustomRepository } from 'typeorm';

import JWTService from './jwt';
import UserRepository from '../repository/user';
import { User } from '../models/User';
import APIError from '../errors/APIError';

class AuthService {
  async login(email: string, password: string) {
    const user = await getCustomRepository(UserRepository)
      .findByEmail(email);

    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new APIError('Invalid e-mail or password', 400);
    }

    return new JWTService().generateAccessToken(user.id);
  }

  async register(registration: RegistrationRequest) {
    this.validateRegistration(registration);
    await this.validateEmail(registration.email)
      .catch((error) => Promise.reject(error));
    this.validatePassword(registration.password, registration.passwordConfirmation);

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
      !registration.email || !registration.password ||
      !registration.passwordConfirmation) {
      throw new APIError('Some of the required fields are\'t filled', 400);
    }
  }

  private validatePassword(password: string, passwordConfirmation: string) {
    if (password !== passwordConfirmation) {
      throw new APIError('Password and password confirmation doesn\'t match', 400);
    }
  }

  private async validateEmail(email: string) {
    const matchedUser = await getCustomRepository(UserRepository)
      .findByEmail(email);

    if (matchedUser) {
      throw new APIError('E-mail is already in use', 400);
    }
  }
}

export default AuthService;
