import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../../../prisma/prisma.service';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const gqlContext = GqlExecutionContext.create(context);
    const { req } = gqlContext.getContext();

    const accesstoken = req.headers.accesstoken as string;
    const refreshtoken = req.headers.refreshtoken as string;

    if (!accesstoken || !refreshtoken) {
      throw new UnauthorizedException('Please login to access this service');
    }

    if (accesstoken) {
      // const decode = this.jwtService.verify(accesstoken, {
      //   secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
      // });

      // console.log('DECODE', decode);

      // if (!decode) {
      //   throw new UnauthorizedException('Invalid access token');
      // }

      // await this.updateAccessToken(req);
      const decode = this.jwtService.decode(accesstoken);

      const expirationTime = decode?.iat;

      if (expirationTime < Date.now()) {
        await this.updateAccessToken(req);
      }
    }

    return true;
  }

  private async updateAccessToken(req: any): Promise<void> {
    try {
      // const refreshTokenData = req.headers.refreshtoken as string;

      // const decode = this.jwtService.verify(refreshTokenData, {
      //   secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
      // });

      // if (!decode) {
      //   throw new UnauthorizedException('Invalid refresh token');
      // }

      const refreshTokenData = req.headers.refreshtoken as string;

      const decoded = this.jwtService.decode(refreshTokenData);

      const expirationTime = decoded.exp * 1000;

      if (expirationTime < Date.now()) {
        throw new UnauthorizedException(
          'Please login to access this resource!',
        );
      }

      const user = await this.prisma.user.findUnique({
        where: { id: decoded.id },
      });

      const accessToken = await this.jwtService.sign(
        { id: user.id },
        {
          secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
          expiresIn: '15m',
        },
      );

      const refreshToken = await this.jwtService.sign(
        { id: user.id },
        {
          secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
          expiresIn: '7d',
        },
      );

      req.accesstoken = accessToken;
      req.refreshtoken = refreshToken;
      req.user = user;
    } catch (error) {
      console.log('AuthGuard Error: ', error.message);
    }
  }
}
