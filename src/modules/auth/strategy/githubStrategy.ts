import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get<string>('GITHUB_OAUTH_CLIENT_ID'),
      clientSecret: configService.get<string>('GITHUB_OAUTH_CLIENT_SECRET'),
      callbackURL: configService.get('GITHUB_CALLBACK_URL'),
      scope: ['user:email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    const { username, profileUrl, photos, emails } = profile;

    const user = {
      username: username,
      url: profileUrl,
      photo: photos,
      email: emails,
    };
    return { user, accessToken };
  }
}
