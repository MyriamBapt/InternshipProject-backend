import { Type } from "class-transformer";
import { IsDate } from "class-validator";
import { User } from '../entities/User';
import { Professional } from '../entities/Professional';
import { Tag } from '../entities/Tag';

export class ReviewsDto {
  id?: number;
  user: User;
  prof: Professional;
  stars: number;
  review: string;
  @Type(() => Date)
  @IsDate()
  date: Date;
  tag: Tag;
}
