import { IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class RendezVousDto {
  id?: number;
  userId: number;
  profId: number;
  moreInfo: string;
  duration: number;
  @Type(() => Date)
  @IsDate()
  date: Date;
}
