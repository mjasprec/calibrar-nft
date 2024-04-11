import { ObjectType, Field, Directive } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields: "id")')
export class Nft {
  @Field()
  id: string;

  @Field()
  userId: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  imgUrl: string;

  @Field()
  price: number;

  @Field()
  category: string;
}
