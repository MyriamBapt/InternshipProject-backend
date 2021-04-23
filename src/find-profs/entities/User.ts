import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RendezVous } from "./RendezVous";
import { Review } from "./Review";
import { UserWeight } from './UserWeight';
import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';

@Entity('users')
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    length: 80,
    nullable: false
  })
  name: string;

  @Column({
    type: "varchar",
    length: 80,
    nullable: false
  })
  surname: string;

  @Column({
    type: "varchar",
    length: 80,
    nullable: false,
    unique: true
  })
  email: string;

  @Column({
    type: "varchar",
    length: 80,
    nullable: false,
    unique: true
  })
  pseudo: string;

  @Column({
    type: "varchar",
    length: 80,
    nullable: false,
  })
  password: string;

  @Column({
    type: "timestamptz",
    nullable: false
  })
  @Type(() => Date)
  @IsDate()
  created_at: Date;

  @Column({
    type: "timestamptz",
    nullable: false
  })
  @Type(() => Date)
  @IsDate()
  updated_at: Date;

  @Column({
    type: "float",
    nullable: false,
  })
  height: number;

  @Column({
    type: 'integer',
    nullable: true,
  })
  gender: number;

  @Column({
    type: "varchar",
    length: 80,
    nullable: false,
  })
  one_signal_player_id: string;

  @Column({
    type: "varchar",
    length: 80,
    nullable: false,
  })
  auth_method: string;

  @Column({
    type: "varchar",
    length: 150,
    nullable: false
  })
  photo_id: string;

  @Column({
    type: "timestamptz",
    nullable: false
  })
  @Type(() => Date)
  @IsDate()
  birth_date: Date;

  @Column({
    type: 'boolean',
    nullable: false,
  })
  profile_completed: boolean;

  @Column({
    type: 'boolean',
    nullable: false,
  })
  from_firebase: boolean;

  @Column({
    type: "timestamptz",
    nullable: false
  })
  @Type(() => Date)
  @IsDate()
  last_connection: Date;

  @Column({
    type: "float",
    nullable: false,
  })
  target_weight: number;

  @Column({
    type: "float",
    nullable: false,
  })
  original_weight: number;

  @Column({
    type: "float",
    nullable: false,
  })
  target_loose_weight: number;

  @Column({
    type: "varchar",
    length: 150,
    nullable: false,
  })
  fb_id: string;

  @Column({
    type: "varchar",
    length: 150,
    nullable: false,
  })
  apple_id: string;

  @OneToMany(
    ()=> RendezVous,
    (rendezVous) => rendezVous.user
  )
  public rendezVous: RendezVous[];

  @OneToMany(
    ()=> Review,
    (review) => review.user
  )
  public review: Review[];

  @OneToMany(
    ()=> UserWeight,
    (userWeight) => userWeight.user
  )
  public userWeight: UserWeight[];

}
