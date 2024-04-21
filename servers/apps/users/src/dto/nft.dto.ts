import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export enum NftCategory {
  basketball = 'basketball',
  boxing = 'boxing',
  mma = 'mma',
  hockey = 'hockey',
}

registerEnumType(NftCategory, {
  name: 'NftCategory',
});

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

  @Field(() => NftCategory)
  category: NftCategory;
}

@InputType()
export class UpdateNftDto {
  @Field()
  @IsNotEmpty({ message: 'Id is required.' })
  id: string;

  @Field()
  @IsNotEmpty({ message: 'Name is required.' })
  @MinLength(2, { message: 'Name must be at least 2 characters' })
  name: string;

  @Field()
  @IsNotEmpty({ message: 'Description is required' })
  description: string;

  @Field()
  @IsNotEmpty({ message: 'Price is required.' })
  price: number;

  @Field(() => NftCategory)
  category: NftCategory;

  @Field()
  @IsNotEmpty({ message: 'ImgUrl is required.' })
  imgUrl: string;
}
