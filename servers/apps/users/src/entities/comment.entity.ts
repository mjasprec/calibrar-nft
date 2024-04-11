import { ObjectType, Field, Directive } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields: "id")')
export class Comment {
  @Field()
  id: string;

  @Field()
  userId: string;

  @Field()
  nftId: string;

  @Field()
  commentText: string;
}
