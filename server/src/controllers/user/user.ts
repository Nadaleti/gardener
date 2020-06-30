import UserService from '../../services/user';
import { Request, Response, NextFunction } from 'express';
import APIError from '../../errors/APIError';

const userService = new UserService();

class UserController {
  show(request: Request, response: Response, next: NextFunction) {
    userService.getUser(Number.parseInt(request.params.userId))
      .then((user) => {
        if (user) {
          response.status(200).json({
            name: user.name,
            email: user.email,
            gender: user.gender,
            uf: user.uf,
            city: user.city
          })
        } else {
          next(new APIError('User not found', 400))
        }
      })
      .catch((error) => { next(error) });
  }

  update(request: Request, response: Response, next: NextFunction) {
    const userId = Number.parseInt(request.params.userId);
    userService.updateUser(userId, request.body)
      .then(() => {response.status(200).send()})
      .catch((error) => {next(error)});
  }
}

export default UserController;
