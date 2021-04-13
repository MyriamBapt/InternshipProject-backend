import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RendezVous } from "./RendezVous";
import { Review } from "./Review";

@Entity('professionals')
export class Professional {

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
    type: "varchar",
    length: 10,
    nullable: false,
    unique: true
  })
  phone: string;

  @Column({
    type: "varchar",
    length: 100,
    nullable: false
  })
  city: string;

  @Column({
    type: "varchar",
    length: 100,
    nullable: false
  })
  occupation: string;

  @Column({
    type: "int",
    nullable: false
  })
  years_activity: number;

  @Column({
    type: "varchar",
    length: 4,
    nullable: false,
    array: true
  })
  specs: string[];

  @Column({
    type: "money",
    nullable: false
  })
  first_meeting_price: number;

  @Column({
    type: "money",
    nullable: false
  })
  followup_meeting_price: number;

  @Column({
    type: "varchar",
    length: 100,
    nullable: false
  })
  avatar_url: string;

  @OneToMany(
    () => RendezVous,
    (rendezVous) => rendezVous.professional
  )
  public rendezVous: RendezVous[];

  @OneToMany(
    () => Review,
    (review) => review.professional
  )
  public review: Review;

}
