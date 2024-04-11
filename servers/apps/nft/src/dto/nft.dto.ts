import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class NftDto {
  @Field()
  userId: string;

  @Field()
  @IsNotEmpty({ message: 'Name is required.' })
  @IsString({ message: 'Name must be a string.' })
  name: string;

  @Field()
  @IsNotEmpty({ message: 'Email is required.' })
  description: string;

  @Field()
  @IsNotEmpty({ message: 'Image url is required.' })
  imgUrl: string;

  @Field()
  @IsNotEmpty({ message: 'Wallet amount is required.' })
  price: number;
}
