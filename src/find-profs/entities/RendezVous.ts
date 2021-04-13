import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Type } from "class-transformer";
import { IsDate } from "class-validator";
import { User } from "./User";
import { Professional } from "./Professional";

@Entity()
export class RendezVous {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "text",
    nullable: false
  })
  more_info: string;

  @Column({
    type: "timestamptz",
    nullable: false
  })
  @Type(() => Date)
  @IsDate()
  date_hour: Date;

  @ManyToOne(
    () => User,
    (user) => user.rendezVous
  )
  public user: User;

  @ManyToOne(
    () => Professional,
    (professional) => professional.rendezVous
  )
  public professional: Professional;

}








