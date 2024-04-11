import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from './dto/user.dto';
// import { Response } from 'express';

@Injectable()
export class UsersService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
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

    const newUser = {
      name,
      email,
      username,
      password,
      gender,
      birthday,
      wallet,
      about,
      role,
    };

    return newUser;
  }

  async LoginUser(loginDto: LoginDto) {
    const { username, password } = loginDto;

    const existingUser = { username, password };

    return existingUser;
  }

  async GetUsers() {
    const users = [];

    return users;
  }
}
