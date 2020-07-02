import { Request, Response, NextFunction } from 'express';

import AuthService from '../../services/auth';
import { LoginRequest } from '../../models/request';

const authService = new AuthService();

class AuthController {
  login(request: Request, response: Response, next: NextFunction) {
    const login: LoginRequest = request.body;

    authService.login(login.email, login.password)
      .then((token) => {response.status(200).json({token: token})})
      .catch((error) => {next(error)});
  }

  register(request: Request, response: Response, next: NextFunction) {    
    authService.register(request.body)
      .then(() => {response.status(201).send()})
      .catch((error) => {next(error)});
  }
}

export default AuthController;
