import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User, UsersService } from '../../modules/users';
import { JwtService } from '@nestjs/jwt';
import { Payload } from '../../shared';
import { compare, encrypt, genRand } from '../../shared/constants';
import { PrismaClientKnownRequestError } from 'prisma/prisma-client/runtime/binary';
import { Profile } from 'passport-github';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly config: ConfigService,
    private readonly jwtService: JwtService
  ) {}

  public async signIn(dto: User) {
    const { email, password } = dto;
    const foundedUser = await this.userService.findOneByEmail(email);

    if (!foundedUser || !foundedUser.password) {
      throw new ForbiddenException('Credentials incorrect or user not found');
    }

    const isMatched = compare(password, foundedUser.password);
    if (!isMatched) throw new ForbiddenException('Credentials incorrect');

    return await this.authHandler(foundedUser);
  }

  public async signUp(dto: User) {
    const { email, password, username } = dto;
    const existingUser = await this.userService.findOneByEmail(email);
    const encryptedPassword = encrypt(password);

    if (existingUser) {
      throw new ForbiddenException('Credentials taken');
    }

    try {
      const user = await this.userService.create({
        email,
        password: encryptedPassword,
        username,
      });

      return await this.authHandler(user);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  public async verifyGoogleUser(profile: any) {
    const { id, displayName, email, picture } = profile;
    const existingUser = await this.userService.findOneById(id);

    if (!existingUser) {
      const newUser = await this.userService.create({
        id,
        username: displayName,
        email,
        avatar: picture,
        password: genRand('password'),
      });

      return await this.authHandler(newUser);
    }

    return await this.authHandler(existingUser);
  }

  public async verifyGithubUser(profile: Profile) {
    const { id, username, photos } = profile;
    const foundedUser = await this.userService.findOneById(id);

    if (!foundedUser) {
      const newUser = await this.userService.create({
        id,
        username,
        avatar: photos[0].value,
        password: genRand('password'),
        email: genRand('email'),
      });

      return await this.authHandler(newUser);
    }

    return await this.authHandler(foundedUser);
  }

  public async verifyPayload(payload: Payload) {
    try {
      const user = await this.userService.findOneByEmail(payload.email);
      delete user.password;

      return user;
    } catch (error) {
      throw new UnauthorizedException(
        `There isn't any user with email: ${payload.email}`
      );
    }
  }

  private async authHandler(dto: User) {
    const access_token = await this.generateToken({
      sub: dto.id,
      email: dto.email,
    });

    delete dto.password;
    return { access_token, dto };
  }

  private async generateToken(payload: Payload): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      secret: this.config.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: this.config.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
    });
  }
}
