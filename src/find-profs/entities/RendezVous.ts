import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Type } from "class-transformer";
import { IsDate, IsInt, IsString, MaxLength, MinLength } from 'class-validator';
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
  @IsString()
  @MinLength(2, { message: 'RendezVous info contains min 2 characters',})
  @MaxLength(300, { message: 'RendezVous info contains max 100 characters',})
  more_info: string;

  @Column({
    type: "timestamptz",
    nullable: false
  })
  @Type(() => Date)
  @IsDate()
  date_hour: Date;

  /*@Column({
    type: "date",
    nullable: true
  })
  date_rdv: string;

  @Column({
    type: "time with time zone",
    nullable: true
  })
  time_rdv: string;*/

  @Column({
    type: "number",
    nullable: false
  })
  @IsInt()
  duration: number;

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








