import { ObjectType, Field, Directive } from '@nestjs/graphql';
import { Nft } from 'apps/nft/src/entities/nft.entity';

@ObjectType()
@Directive('@key(fields: "id")')
export class Avatar {
  @Field()
  id: string;

  @Field()
  public_id: string;

  @Field()
  url: string;

  @Field()
  userId: string;
}

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  username: string;

  @Field()
  password: string;

  @Field()
  gender: string;

  @Field()
  birthday: string;

  @Field()
  wallet: number;

  @Field()
  about: string;

  @Field()
  role: string;

  @Field(() => Avatar, { nullable: true })
  avatar?: Avatar | null;

  @Field(() => Nft, { nullable: true })
  nfts?: Nft | null;
}
