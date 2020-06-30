import { EntityRepository, Repository, getConnection } from 'typeorm';

import { Vase } from '../models/entity';

@EntityRepository(Vase)
class VaseRepository extends Repository<Vase> {
  findAllUserVases(userId: number): Promise<Vase[]> {
    return getConnection()
      .createQueryBuilder(Vase, 'vase')
      .select('vase')
      .leftJoin('vase.user', 'user')
      .where('vase.user.id = :userId', {userId: userId})
      .getMany();
  }

  findUserVasesByName(userId: number, vaseName: string): Promise<Vase[]> {
    if (!vaseName || vaseName == '') {
      return this.findAllUserVases(userId);
    }

    return getConnection()
      .createQueryBuilder(Vase, 'vase')
      .select('vase')
      .leftJoin('vase.user', 'user')
      .where('user.id = :userId', {userId: userId})
      .andWhere('vase.name LIKE :name', {name: '%' + vaseName + '%'})
      .getMany();
  }
}

export default VaseRepository;
