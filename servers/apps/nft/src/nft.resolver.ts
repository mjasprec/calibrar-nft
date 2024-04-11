import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NftService } from './nft.service';
import { CreateNftResponse } from '../../users/src/types/nft.types';
import { NftDto } from '../../users/src/dto/nft.dto';
// import { Response } from 'express';
import { BadRequestException } from '@nestjs/common';
import { Nft } from '../../users/src/entities/nft.entity';

@Resolver()
export class NftResolver {
  constructor(private readonly nftService: NftService) {}

  @Mutation(() => CreateNftResponse)
  async CreateNft(
    @Args('nftDto') nftDto: NftDto,
    // @Context() context: { res: Response },
  ) {
    if (
      !nftDto.name ||
      !nftDto.description ||
      !nftDto.price ||
      !nftDto.imgUrl
    ) {
      throw new BadRequestException('Please fill in all the required fields');
    }

    const nft = await this.nftService.CreateNft(nftDto);

    return { nft };
  }

  @Query(() => [Nft])
  async GetAllNft() {
    return this.nftService.GetAllNft();
  }
}
