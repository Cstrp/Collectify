import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-github';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../services';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    config: ConfigService,
    private readonly authService: AuthService
  ) {
    super({
      clientID: config.get<string>('GITHUB_CLIENT_ID'),
      clientSecret: config.get<string>('GITHUB_CLIENT_SECRET'),
      callbackURL: config.get('GITHUB_CALLBACK_URL_DEV'),
      scope: ['user'],
    });
  }

  public async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile
  ) {
    const user = await this.authService.verifyGithubUser(profile);
    return { user };
  }
}
