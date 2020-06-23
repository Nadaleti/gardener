import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Vase } from './Vase';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  gender: string;

  @Column()
  city: string;

  @Column()
  uf: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(type => Vase, vase => vase.user)
  vases: Vase[];
}
