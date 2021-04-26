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
import { Tag } from './Tag';
import { Language } from './Language';

@Entity('professionals')
export class Professional {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @IsString({ message: 'Only characters allowed for first name',})
  @MinLength(3, { message: 'First name contains min 3 characters',})
  @MaxLength(50, { message: 'First name contains max 50 characters',})
  first_name: string;

  @Column({ nullable: false })
  @IsString({ message: 'Only characters allowed for last name',})
  @MinLength(3, { message: 'Last name contains min 3 characters',})
  @MaxLength(80, { message: 'Last name contains max 80 characters',})
  last_name: string;

  @Column({ nullable: false })
  @IsEmail()
  @MaxLength(80)
  email: string;

  @Column({ nullable: false })
  @IsString()
  @MinLength(10, { message: 'Phone contains 10 characters',})
  @MaxLength(10, { message: 'Phone contains 10 characters',})
  @IsMobilePhone()
  phone: string;

  @Column({ nullable: false })
  @IsString()
  @MinLength(2, { message: 'City contains min 2 characters',})
  @MaxLength(100, { message: 'City contains max 100 characters',})
  city: string;

  @Column({ nullable: false })
  @IsString()
  @MinLength(2, { message: 'Occupation contains min 2 characters',})
  @MaxLength(100, { message: 'Occupation contains max 100 characters',})
  occupation: string;

  @Column({ nullable: false })
  @IsInt()
  @IsNotEmpty({ message: 'Years of activity can not be empty',})
  years_activity: number;

  @Column({
    type: "money",
    nullable: false,
  })
  @Min(5)
  @Max(200)
  first_meeting_price: number;

  @Column({
    type: "money",
    nullable: false,
  })
  @Min(5)
  @Max(200)
  followup_meeting_price: number;

  @Column({
    nullable: true,
  })
  @Min(5, { message: 'avatar url contains min 5 characters',})
  @Max(200, { message: 'avatar url contains max 200 characters',})
  avatar_url: string;

  @Column({ nullable: false })
  @IsString()
  @MinLength(10, { message: 'Description contains min 10 characters',})
  @MaxLength(200, { message: 'Description contains max 200 characters',})
  description: string;

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

  @OneToMany(
    () => Tag,
    (tag) => tag.professional
  )
  public tag: Tag;

  @OneToMany(
    () => Language,
    (language) => language.professional
  )
  public language: Language;

}
