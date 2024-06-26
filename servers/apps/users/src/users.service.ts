import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';
import {
  ActivationDto,
  ForgotPasswordDto,
  Genders,
  LoginDto,
  RegisterDto,
  ResetPasswordDto,
  Roles,
} from './dto/user.dto';
import { NftDto, UpdateNftDto } from './dto/nft.dto';
import { PrismaService } from '../../../prisma/prisma.service';
import { CommentDto } from './dto/comment.dto';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { EmailService } from './email/email.service';
import { TokenSender } from './utils/sendToken';
import { User } from '@prisma/client';

type Nft = {
  id: string;
  userId: string;
  name: string;
  description: string;
  imgUrl: string;
  price: number;
  category: string;
};

type Avatar = {
  id: string;
  imgUrl: string;
  userId: string;
};

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  gender: Genders;
  birthday: Date;
  wallet: number;
  about: string;
  role: Roles;
  avatar?: Avatar;
  nfts?: [Nft];
}

@Injectable()
export class UsersService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {}

  async RegisterUser(registerDto: RegisterDto, response: Response) {
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
      const isExistingEmail = await this.prisma.user.findUnique({
        where: { email },
      });

      const isExistingUsername = await this.prisma.user.findUnique({
        where: { username },
      });

      if (isExistingEmail || isExistingUsername) {
        throw new BadRequestException('Username/Email already exists.');
      }

      const user = {
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
      };

      const activationToken = await this.CreateActivationToken(user);

      const activationCode = activationToken.activationCode;

      const activation_token = activationToken.token;

      await this.emailService.sendMail({
        email,
        subject: 'Activate your account',
        template: './activation-email',
        name: `${firstName} ${lastName}`,
        activationCode,
      });

      return { activation_token, response };
    } catch (error) {
      console.log('PRISMA RegisterUser ERROR', error.message);
      throw new BadRequestException(error.message);
    }
  }

  async CreateActivationToken(user: UserData) {
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

    const token = this.jwtService.sign(
      {
        user,
        activationCode,
      },
      {
        secret: this.configService.get<string>('ACTIVATION_SECRET'),
        expiresIn: '5m',
      },
    );

    return { token, activationCode };
  }

  async ActivateUser(activationDto: ActivationDto, response: Response) {
    const { activationToken, activationCode } = activationDto;

    const newUser: { user: UserData; activationCode: string } =
      (await this.jwtService.verify(activationToken, {
        secret: this.configService.get<string>('ACTIVATION_SECRET'),
      } as JwtVerifyOptions)) as { user: UserData; activationCode: string };

    if (newUser.activationCode !== activationCode) {
      throw new BadRequestException('Invalid activation code');
    }

    const {
      email,
      username,
      password,
      firstName,
      lastName,
      gender,
      birthday,
      wallet,
      about,
      role,
    } = newUser.user;

    const existingUserEmail = await this.prisma.user.findUnique({
      where: { email },
    });
    const existingUserUsername = await this.prisma.user.findUnique({
      where: { username },
    });

    if (existingUserEmail || existingUserUsername) {
      throw new BadRequestException('User already exists');
    }

    const saltGen = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, saltGen);

    const user = await this.prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        username,
        password: hashedPassword,
        gender,
        birthday,
        wallet,
        about,
        role,
      },
    });

    return { user, response };
  }

  async LoginUser(loginDto: LoginDto) {
    try {
      const { email, username, password } = loginDto;
      let existingUser;

      if (!email && !username) {
        throw new BadRequestException('Username/Email is required');
      }

      if (email) {
        existingUser = await this.prisma.user.findUnique({
          where: {
            email,
          },
        });
      }

      if (username) {
        existingUser = await this.prisma.user.findUnique({
          where: {
            username,
          },
        });
      }

      const isPasswordMatch = await bcrypt.compare(
        password,
        existingUser.password,
      );

      const getNfts = await this.prisma.nft.findMany({
        where: { userId: existingUser.id },
      });

      const getUserAvatar = await this.prisma.avatar.findUnique({
        where: {
          userId: existingUser.id,
        },
      });

      if (getNfts.length > 0) {
        existingUser.nfts = [...getNfts];
      }

      if (getUserAvatar) {
        existingUser.avatar = { ...getUserAvatar };
      }

      if (existingUser && isPasswordMatch) {
        const tokenSender = new TokenSender(
          this.jwtService,
          this.configService,
        );

        return tokenSender.sendToken(existingUser);
      } else {
        return {
          user: null,
          accessToken: null,
          refreshToken: null,
          error: {
            message: 'Invalid email/username and/or password',
          },
        };
      }
    } catch (error) {
      console.log('PRISMA LoginUser ERROR', error.message);
      throw new BadRequestException(error.message);
    }
  }

  async GetLoggedInUser(req: any) {
    try {
      const user = req.user;
      const accessToken = req.accesstoken;
      const refreshToken = req.refreshtoken;

      const getUserAvatar = await this.prisma.avatar.findUnique({
        where: {
          userId: user.id,
        },
      });

      const getNfts = await this.prisma.nft.findMany({
        where: { userId: user.id },
      });

      if (getUserAvatar) {
        user.avatar = { ...getUserAvatar };
      }

      if (getNfts.length > 0) {
        user.nfts = [...getNfts];
      }

      return { user, accessToken, refreshToken };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async GetUsers() {
    try {
      const users: any = await this.prisma.user.findMany({});

      const newUsers = await users.map(async (user) => {
        user.avatar = await this.prisma.avatar.findUnique({
          where: {
            userId: user.id,
          },
        });

        return user;
      });

      return newUsers;
    } catch (error) {
      console.log('PRISMA GetUsers ERROR', error.message);
      throw new BadRequestException(error.message);
    }
  }

  async ForgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const { email } = forgotPasswordDto;

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new BadRequestException('Email does not exist/Invalid email');
    }

    const forgotPasswordToken = await this.GenerateForgotPasswordLink(user);

    // console.log('forgotPasswordToken', forgotPasswordToken);

    const resetPasswordUrl = `${this.configService.get<string>('CLIENT_SIDE_URI')}/reset-password?verify=${forgotPasswordToken}`;

    await this.emailService.sendMail({
      email: user.email,
      subject: 'Reset your password',
      template: './forgot-password',
      name: `${user.firstName} ${user.lastName}`,
      activationCode: resetPasswordUrl,
    });

    return { message: 'Your forgot password request was successful!' };
  }

  async GenerateForgotPasswordLink(user: User) {
    const forgotPasswordToken = this.jwtService.sign(
      {
        user,
      },
      {
        secret: this.configService.get<string>('FORGOT_PASSWORD_SECRET'),
        expiresIn: '5m',
      },
    );
    return forgotPasswordToken;
  }

  async ResetPassword(resetPasswordDto: ResetPasswordDto) {
    try {
      const { password, activationToken } = resetPasswordDto;

      const decoded = await this.jwtService.decode(activationToken);

      if (!decoded || decoded?.exp * 1000 < Date.now()) {
        throw new BadRequestException('Invalid activation token');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await this.prisma.user.update({
        where: {
          id: decoded.user.id,
        },
        data: {
          password: hashedPassword,
        },
      });

      return { user };
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }

  async LogoutUser(req: any) {
    req.user = null;
    req.accessToken = null;
    req.refreshtoken = null;

    return { message: 'Successfully logged out' };
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
      console.log('PRISMA CreateNft ERROR', error.message);
      throw new BadRequestException(error.message);
    }
  }

  async UpdateNft(updateNftDto: UpdateNftDto) {
    try {
      const { id, name, description, price, imgUrl, category } = updateNftDto;

      const updatedNft = await this.prisma.nft.update({
        where: { id },
        data: { imgUrl, name, description, price, category },
      });

      return updatedNft;
    } catch (error: any) {
      console.log('UpdateNft', error.message);
      throw new BadRequestException(error.message);
    }
  }

  async GetAllNft() {
    try {
      const nfts = this.prisma.nft.findMany({});

      // const nftWithOwner = await nfts.map(async (nft) => {
      //   nft.owner = await this.prisma.user.findUnique({
      //     where: { id: nft.userId },
      //   });
      //   return nft;
      // });

      return nfts;
    } catch (error) {
      console.log('PRISMA GetAllNft ERROR', error.message);
      throw new BadRequestException(error.message);
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
      console.log('PRISMA CreateNFTComment ERROR', error.message);
      throw new BadRequestException(error.message);
    }
  }
}
