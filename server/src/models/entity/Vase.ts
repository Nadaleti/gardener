import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { User } from './User';
import { PlantTypeEnum } from '../enum/plantType.enum';

@Entity()
export class Vase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column()
  plantType: PlantTypeEnum;

  @ManyToOne(type => User, user => user.vases)
  user: User;
}
