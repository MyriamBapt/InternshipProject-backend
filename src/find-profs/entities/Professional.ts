import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {
  IsArray, IsCurrency,
  IsEmail, IsFQDN,
  IsInt, IsMobilePhone,
  IsNotEmpty,
  IsPositive,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength
} from "class-validator";

import { RendezVous } from "./RendezVous";
import { Review } from "./Review";

@Entity('professionals')
export class Professional {

  @PrimaryGeneratedColumn()
  @IsInt()
  @IsPositive()
  id: number;

  @Column({
    type: "varchar",
    length: 50,
    nullable: false
  })
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  first_name: string;

  @Column({
    type: "varchar",
    length: 80,
    nullable: false
  })
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  last_name: string;

  @Column({
    type: "varchar",
    length: 80,
    nullable: false,
    unique: true
  })
  @IsEmail()
  @MaxLength(80)
  email: string;

  @Column({
    type: "varchar",
    length: 10,
    nullable: false,
    unique: true
  })
  @IsString()
  @MinLength(10)
  @MaxLength(10)
  @IsMobilePhone()
  phone: string;

  @Column({
    type: "varchar",
    length: 100,
    nullable: false
  })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  city: string;

  @Column({
    type: "varchar",
    length: 100,
    nullable: false
  })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  occupation: string;

  @Column({
    type: "int",
    nullable: false
  })
  @IsInt()
  @IsNotEmpty()
  years_activity: number;

  @Column({
    type: "varchar",
    length: 40,
    nullable: true,
    array: true
  })
  @IsArray()
  specs: string[];

  @Column({
    type: "money",
    nullable: false
  })
  @Min(5)
  @Max(200)
  @IsCurrency()
  first_meeting_price: number;

  @Column({
    type: "money",
    nullable: false
  })
  @Min(5)
  @Max(200)
  @IsCurrency()
  followup_meeting_price: number;

  @Column({
    type: "varchar",
    length: 100,
    nullable: false
  })
  @IsNotEmpty()
  @IsString()
  @IsFQDN()
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
