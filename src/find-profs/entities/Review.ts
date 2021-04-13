import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Type } from "class-transformer";
import { IsDate } from "class-validator";
import { User } from "./User";
import { Professional } from "./Professional";

@Entity('reviews')
export class Review {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "text",
    nullable: false
  })
  review: string;

  @Column({
    type: "int",
    nullable: false
  })
  stars: number;

  @Column({
    type: "timestamptz",
    nullable: false
  })
  @Type(() => Date)
  @IsDate()
  date_hour: Date;

  @ManyToOne(
    () => User,
    (user) => user.review
  )
  public user: User;

  @ManyToOne(
    () => Professional,
    (professional) => professional.review
  )
  public professional: Professional;

}
