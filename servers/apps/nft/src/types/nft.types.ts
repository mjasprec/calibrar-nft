import { ObjectType, Field } from '@nestjs/graphql';
import { Nft } from '../entities/nft.entity';

@ObjectType()
export class ErrorType {
  @Field()
  message: string;

  @Field({ nullable: true })
  code?: string;
}

@ObjectType()
export class CreateNftResponse {
  @Field(() => Nft, { nullable: true })
  nft?: Nft | any;

  @Field(() => ErrorType, { nullable: true })
  error?: ErrorType;
}
