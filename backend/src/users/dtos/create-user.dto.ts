import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  IsBoolean,
  IsEnum,
} from 'class-validator';
import { role } from '../enums/role.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(96)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(96)
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(96)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(96)
  @Matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&<=])[A-Za-z\d@$!%*#?&<=]{8,}$/,
    {
      message:
        'Minimum eight characters, at least one letter, one number and one special character',
    },
  )
  password: string;

  @IsEnum(role, { message: 'Role must be a valid enum value' })
  @IsNotEmpty()
  role: string;

  @IsString()
  @IsOptional()
  @MaxLength(96)
  division?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  avatarUrl?: string;
}
