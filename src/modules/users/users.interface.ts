import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  MinLength,
  IsString,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { UserStatus } from './user.schema';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsTrue } from 'src/common/decorators/is-true.decorator';
import { MESSAGES } from 'src/common/utils/messages';

class PlanDetailDto {
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  planId: string;
}
export class createUsersDto {
  // @ApiProperty()
  // @IsNotEmpty()
  // @IsString()
  //  username:string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  full_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean({ message: MESSAGES.aggreedToTerms })
  @IsTrue({ message: MESSAGES.aggreedToTermsRequired })
  agreedToTerms: boolean;

  @ApiProperty()
  @ValidateNested()
  @IsOptional()
  @Type(() => PlanDetailDto)
  plan_detail: PlanDetailDto;

  // @ApiProperty({required:false})
  // @IsBoolean()
  //  isDelete: boolean = false;

  //  @ApiProperty({ enum: UserStatus, enumName: 'UserStatus',required:false })
  //  @IsString()
  //  status?: UserStatus;
}

export class UpdateUserDto {
  // @IsOptional()
  // @IsString()
  // username?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  full_name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  password?: string;

  @ValidateNested()
  @IsOptional()
  @Type(() => PlanDetailDto)
  plan_detail: PlanDetailDto;
}

export class deleteUserDto {
  @IsBoolean()
  isDelete: boolean = true;
}

export class GetUsersQuery {
  @IsString()
  @IsOptional()
  full_name: string;
}
