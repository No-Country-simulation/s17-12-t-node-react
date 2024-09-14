import { IsEmail, IsString, Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginCredentialsDto {
  @ApiProperty({
    description: "The user's email address",
    example: 'user@example.com',
  })
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    description:
      "The user's password. It must have between 8 and 20 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character.",
    example: 'P@ssw0rd!',
    minLength: 8,
    maxLength: 20,
  })
  @IsString()
  @Length(8, 20, {
    message: 'The password must have between 8 and 20 characters',
  })
  @Matches(/(?=.*[A-Z])/, {
    message: 'The password must have at least one uppercase letter',
  })
  @Matches(/(?=.*[a-z])/, {
    message: 'The password must have at least one lowercase letter',
  })
  @Matches(/(?=.*\d)/, {
    message: 'The password must have at least one number',
  })
  @Matches(/(?=.*[@$!%*?&#])/, {
    message:
      'The password must have at least one special character (for example, @, $, !, %, *, ?, &, #)',
  })
  readonly password: string;
}
