import { IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class RendezVousDto {
  id?: number;
  userId: number;
  profId: number;
  moreInfo: string;
  @Type(() => Date)
  @IsDate()
  date: Date;
  date_rdv?: string;
  time_rdv?: string;
}
