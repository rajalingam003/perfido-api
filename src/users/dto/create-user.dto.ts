import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsBoolean,
  IsString,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { IsTrue } from '../../common/decorators/is-true.decorator';
import { MESSAGES } from '../../common/utils/messages';

class PlanDetailDto {
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  planId: string;
}

export class CreateUserDto {
  @IsNotEmpty()
  @IsOptional()
  fullName: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @MinLength(6)
  @IsOptional()
  password: string;

  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean({ message: MESSAGES.aggreedToTerms })
  @IsTrue({ message: MESSAGES.aggreedToTermsRequired })
  @IsOptional()
  agreedToTerms: boolean;

  @ValidateNested()
  @IsOptional()
  @Type(() => PlanDetailDto)
  plan_detail: PlanDetailDto;
}
