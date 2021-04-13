import { Type } from "class-transformer";
import { IsDate } from "class-validator";

export class ReviewsDto {
  id?: number;
  userId: number;
  profId: number;
  stars: number;
  review: string;
  @Type(() => Date)
  @IsDate()
  date: Date;
}
