import { Type } from "class-transformer";
import { IsDate } from "class-validator";
import Gender from "./gender";

export class UserDto {
  id?: number;
  name: string;
  surname: string;
  email: string;
  pseudo: string;
  password: string;
  @Type(() => Date)
  @IsDate()
  created_at: Date;
  @Type(() => Date)
  @IsDate()
  updated_at: Date;
  height: number;
  gender: Gender;
  one_signal_player_id: string;
  auth_method: string;
  photo_id: string;
  @Type(() => Date)
  @IsDate()
  birth_date: Date;
  profile_completed: boolean;
  from_firebase: boolean;
  @Type(() => Date)
  @IsDate()
  last_connection: Date;
  target_weight: number;
  original_weight: number;
  target_loose_weight: number;
  fb_id: string;
  apple_id: string;
}
