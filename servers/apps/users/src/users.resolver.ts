import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { RegisterResponse } from './types/user.types';
import { RegisterDto } from './dto/user.dto';
// import { Response } from 'express';
import { BadRequestException } from '@nestjs/common';
import { User } from './entities/user.entity';
// import { NftService } from '../../nft/src/nft.service';
import { CreateNftResponse } from './types/nft.types';
import { NftDto } from './dto/nft.dto';
import { Nft } from './entities/nft.entity';

@Resolver('User')
export class UsersResolver {
  constructor(
    private readonly userService: UsersService,
    // private readonly nftService: NftService,
  ) {}

  @Mutation(() => RegisterResponse)
  async RegisterUser(
    @Args('registerDto') registerDto: RegisterDto,
    // @Context() context: { res: Response },
  ): Promise<RegisterResponse> {
    if (
      !registerDto.name ||
      !registerDto.email ||
      !registerDto.password ||
      !registerDto.username
    ) {
      throw new BadRequestException('Please fill in all required fields');
    }

    const user = await this.userService.RegisterUser(registerDto);

    return { user };
  }

  @Query(() => [User])
  async GetUsers() {
    return this.userService.GetUsers();
  }

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

    const nft = await this.userService.CreateNft(nftDto);

    return { nft };
  }

  @Query(() => [Nft])
  async GetAllNft() {
    return this.userService.GetAllNft();
  }
}
