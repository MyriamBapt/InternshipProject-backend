import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RendezVous } from "./RendezVous";
import { Review } from "./Review";

@Entity('users')
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    length: 50,
    nullable: false
  })
  first_name: string;

  @Column({
    type: "varchar",
    length: 80,
    nullable: false
  })
  last_name: string;

  @Column({
    type: "varchar",
    length: 80,
    nullable: false,
    unique: true
  })
  email: string;

  @Column({
    type: "float",
    nullable: false,
  })
  height: number;

  @Column({
    type: "float",
    nullable: false,
  })
  weight: number;

  @Column({
    type: "text",
    nullable: false,
  })
  other_info: string;

  @Column({
    type: "varchar",
    length: 80,
    nullable: false
  })
  avatar_url: string;

  @OneToMany(
    ()=> RendezVous,
    (rendezVous) => rendezVous.user
  )
  public rendezVous: RendezVous[];

  @OneToMany(
    ()=> Review,
    (review) => review.user
  )
  public review: RendezVous[];

}
