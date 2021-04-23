import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';

export class UserweightDto {
  id?: number;
  @Type(() => Date)
  @IsDate()
  created_at: Date;
  @Type(() => Date)
  @IsDate()
  updated_at: Date;
  weight: number;
  weight_difference: number;

}
