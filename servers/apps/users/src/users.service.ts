import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from './dto/user.dto';
import { NftDto } from './dto/nft.dto';
import { PrismaService } from '../../../prisma/prisma.service';
import { CommentDto } from './dto/comment.dto';
// import { Response } from 'express';

@Injectable()
export class UsersService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  async RegisterUser(
    registerDto: RegisterDto,
    // response: Response
  ) {
    const {
      firstName,
      lastName,
      email,
      username,
      password,
      gender,
      birthday,
      wallet,
      about,
      role,
    } = registerDto;

    try {
      console.log('RegisterUser birthday', birthday);

      const newUser = await this.prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          username,
          password,
          gender,
          birthday,
          wallet,
          about,
          role,
        },
      });

      return newUser;
    } catch (error) {
      console.log('PRISMA RegisterUser ERROR', error);
      throw new BadRequestException(error);
    }
  }

  async LoginUser(loginDto: LoginDto) {
    try {
      const { username, password } = loginDto;

      const existingUser = { username, password };

      return existingUser;
    } catch (error) {
      console.log('PRISMA LoginUser ERROR', error);
      throw new BadRequestException(error);
    }
  }

  async GetUsers() {
    try {
      const users = this.prisma.user.findMany({});

      return users;
    } catch (error) {
      console.log('PRISMA GetUsers ERROR', error);
      throw new BadRequestException(error);
    }
  }

  // NFT
  async CreateNft(nftDto: NftDto) {
    const { userId, name, description, imgUrl, price, category } = nftDto;

    try {
      const newNft = await this.prisma.nft.create({
        data: { userId, name, description, imgUrl, price, category },
      });

      return newNft;
    } catch (error) {
      console.log('PRISMA CreateNft ERROR', error);
      throw new BadRequestException(error);
    }
  }

  async GetAllNft() {
    try {
      const nfts = this.prisma.nft.findMany({});

      return nfts;
    } catch (error) {
      console.log('PRISMA GetAllNft ERROR', error);
      throw new BadRequestException(error);
    }
  }

  // NFT Comment
  async CreateNFTComment(commentDto: CommentDto) {
    try {
      const { userId, nftId, commentText } = commentDto;

      const nftComment = await this.prisma.comment.create({
        data: {
          userId,
          nftId,
          commentText,
        },
      });

      return nftComment;
    } catch (error) {
      console.log('PRISMA CreateNFTComment ERROR', error);
      throw new BadRequestException(error);
    }
  }
}
