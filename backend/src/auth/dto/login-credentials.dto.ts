import { IsEmail, IsString, Length, Matches } from 'class-validator';

export class LoginCredentialsDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  @Length(8, 20, {
    message: 'The password must have between 8 y 20 characters',
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
