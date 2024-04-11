import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class RegisterDto {
  @Field()
  @IsNotEmpty({ message: 'Name is required.' })
  @IsString({ message: 'Name must be a string.' })
  name: string;

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

  @Field(() => String, { defaultValue: 'male' })
  gender: string;

  @Field()
  @IsNotEmpty({ message: 'Birthday is required.' })
  birthday: Date;

  @Field()
  wallet: number;

  @Field()
  about: string;

  @Field(() => String, { defaultValue: 'User', nullable: true })
  role?: string;
}

@InputType()
export class LoginDto {
  @Field()
  @IsNotEmpty({ message: 'Name is required.' })
  username: string;

  @Field()
  @IsNotEmpty({ message: 'Name is required.' })
  password: string;
}
