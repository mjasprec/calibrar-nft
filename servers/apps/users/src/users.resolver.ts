import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import {
  ActivationResponse,
  LoginResponse,
  LogoutResponse,
  RegisterResponse,
} from './types/user.types';
import { ActivationDto, RegisterDto } from './dto/user.dto';
import { Request, Response } from 'express';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateNftResponse } from './types/nft.types';
import { NftDto } from './dto/nft.dto';
import { Nft } from './entities/nft.entity';
import { CreateCommentResponse } from './types/comment.types';
import { CommentDto } from './dto/comment.dto';
import { AuthGuard } from './guards/auth.gaurd';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Mutation(() => RegisterResponse)
  async RegisterUser(
    @Args('registerDto') registerDto: RegisterDto,
    @Context() context: { res: Response },
  ): Promise<RegisterResponse> {
    if (
      !registerDto.firstName ||
      !registerDto.lastName ||
      !registerDto.email ||
      !registerDto.password ||
      !registerDto.username
    ) {
      throw new BadRequestException('Please fill in all required fields');
    }

    const { activation_token } = await this.userService.RegisterUser(
      registerDto,
      context.res,
    );

    return { activation_token };
  }

  @Mutation(() => ActivationResponse)
  async ActivateUser(
    @Args('activationDto') activationDto: ActivationDto,
    @Context() context: { res: Response },
  ): Promise<ActivationResponse> {
    return this.userService.ActivateUser(activationDto, context.res);
  }

  @Query(() => [User])
  async GetUsers() {
    return this.userService.GetUsers();
  }

  // NFT
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

  @Mutation(() => LoginResponse)
  async LoginUser(
    @Args('email') email: string,
    @Args('username') username: string,
    @Args('password') password: string,
  ): Promise<LoginResponse> {
    return await this.userService.LoginUser({ email, username, password });
  }

  @Query(() => LoginResponse)
  @UseGuards(AuthGuard)
  async GetLoggedInUser(@Context() context: { req: Request }) {
    return await this.userService.GetLoggedInUser(context.req);
  }

  @Query(() => LogoutResponse)
  @UseGuards(AuthGuard)
  async LogoutUser(@Context() context: { req: Request }) {
    return await this.userService.LogoutUser(context.req);
  }

  @Query(() => [Nft])
  async GetAllNft() {
    return this.userService.GetAllNft();
  }

  // NFT Comment
  @Mutation(() => CreateCommentResponse)
  async CreateNFTComment(@Args('commentDto') commentDto: CommentDto) {
    if (!commentDto.commentText) {
      throw new BadRequestException('Cannot leave empty comment');
    }

    const comment = await this.userService.CreateNFTComment(commentDto);

    return { comment };
  }
}
