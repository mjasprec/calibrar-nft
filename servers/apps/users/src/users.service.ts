import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from './dto/user.dto';
import { PrismaService } from '../../../prisma/prisma.service';
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
      name,
      email,
      username,
      password,
      gender,
      birthday,
      wallet,
      about,
      role,
    } = registerDto;

    console.log('RegisterUser birthday', birthday);

    const newUser = await this.prisma.user.create({
      data: {
        name,
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
  }

  async LoginUser(loginDto: LoginDto) {
    const { username, password } = loginDto;

    const existingUser = { username, password };

    return existingUser;
  }

  async GetUsers() {
    const users = this.prisma.user.findMany({});

    return users;
  }
}
