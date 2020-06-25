import { Repository, EntityRepository } from 'typeorm';

import { User } from '../models/User';

@EntityRepository(User)
class UserRepository extends Repository<User> {
  findByEmail(email: string) {
    return this.findOne({ email: email });
  }
}

export default UserRepository;
