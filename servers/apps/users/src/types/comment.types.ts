import { ObjectType, Field } from '@nestjs/graphql';
import { Comment } from '../entities/comment.entity';

@ObjectType()
export class CommentErrorType {
  @Field()
  message: string;

  @Field({ nullable: true })
  code?: string;
}

@ObjectType()
export class CreateCommentResponse {
  @Field(() => Comment, { nullable: true })
  comment?: Comment | any;

  @Field(() => CommentErrorType, { nullable: true })
  error?: CommentErrorType;
}
