import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { User } from './User';

@Entity()
export class Vase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column()
  plantType: string;

  @ManyToOne(type => User, user => user.vases)
  user: User;
}
