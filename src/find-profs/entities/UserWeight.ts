import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';
import { User } from './User';

@Entity()
export class UserWeight {

  @PrimaryGeneratedColumn()
  id: number;

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
    nullable: false
  })
  weight:number;

  @Column({
    type: "float",
    nullable: false
  })
  weight_difference:number;

  @ManyToOne(
    () => User,
    (user) => user.userWeight
  )
  public user: User;






}
