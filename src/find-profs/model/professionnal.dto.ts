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

export class ProfessionnalDto {
  id?: number;

  @IsString()
  @MinLength(3)
  @MaxLength(50)
  firstName: string;

  @IsString()
  @MinLength(3)
  @MaxLength(80)
  lastName: string;

  @IsEmail()
  @MaxLength(80)
  email: string;professional

  @IsString()
  @MinLength(10)
  @MaxLength(10)
  @IsMobilePhone()
  phone: string;

  @IsString()
  @MinLength(2)
  @MaxLength(100)
  city: string;

  @IsString()
  @MinLength(2)
  @MaxLength(100)
  occupation: string;

  @IsInt()
  @IsNotEmpty()
  yearsActivity: number;

  @IsArray()
  specs: string[];

  @Min(5)
  @Max(200)
  @IsCurrency()
  firstMeetingPrice: number;

  @Min(5)
  @Max(200)
  @IsCurrency()
  followupMeetingPrice: number;

  @IsNotEmpty()
  @IsString()
  @IsFQDN()
  avatarUrl: string;
}
