import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export enum Genders {
  male = 'male',
  female = 'female',
}

export enum Roles {
  Admin = 'Admin',
  User = 'User',
}

registerEnumType(Genders, {
  name: 'Genders',
});

registerEnumType(Roles, {
  name: 'Roles',
});

@InputType()
export class RegisterDto {
  @Field()
  @IsNotEmpty({ message: 'First name is required.' })
  @IsString({ message: 'First name must be a string.' })
  firstName: string;

  @Field()
  @IsNotEmpty({ message: 'Last name is required.' })
  @IsString({ message: 'Last name must be a string.' })
  lastName: string;

  @Field()
  @IsNotEmpty({ message: 'Email is required.' })
  @IsEmail({}, { message: 'Email is invalid.' })
  email: string;

  @Field()
  @IsNotEmpty({ message: 'Username is required.' })
  @IsString({ message: 'Username must be a string.' })
  @MinLength(6, { message: 'Username must be at least 6 characters' })
  username: string;

  @Field()
  @IsNotEmpty({ message: 'Password is required.' })
  @IsString({ message: 'Password must be a string.' })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;

  @Field(() => Genders, { defaultValue: 'male' })
  gender: Genders;

  @Field()
  @IsNotEmpty({ message: 'Birthday is required.' })
  birthday: Date;

  @Field()
  wallet: number;

  @Field()
  about: string;

  @Field(() => Roles, { defaultValue: 'User', nullable: true })
  role?: Roles;
}

@InputType()
export class ActivationDto {
  @Field()
  @IsNotEmpty({ message: 'Activation token is required.' })
  activationToken: string;

  @Field()
  @IsNotEmpty({ message: 'Activation code is required.' })
  activationCode: string;
}

@InputType()
export class LoginDto {
  @Field({ nullable: true })
  // @IsNotEmpty({ message: 'Name is required.' })
  username?: string;

  @Field({ nullable: true })
  email?: string;

  @Field()
  @IsNotEmpty({ message: 'Password is required.' })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;
}
@InputType()
export class ForgotPasswordDto {
  @Field()
  @IsNotEmpty({ message: 'Email address is required.' })
  @IsEmail({}, { message: 'Must be a valid email address .' })
  email: string;
}

@InputType()
export class ResetPasswordDto {
  @Field()
  @IsNotEmpty({ message: 'Password is required.' })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;

  @Field()
  @IsNotEmpty({ message: 'Activation token is required' })
  activationToken: string;
}
