import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CommentDto {
  @Field()
  userId: string;

  @Field()
  nftId: string;

  @Field()
  @IsString({ message: 'Name must be a string.' })
  commentText: string;
}
