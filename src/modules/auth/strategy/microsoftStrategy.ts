import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-microsoft';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MicrosoftStrategy extends PassportStrategy(Strategy, 'microsoft') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get('AZURE_AD_CLIENT_ID'),
      clientSecret: configService.get('AZURE_AD_CLIENT_SECRET'),
      callbackURL: configService.get('AZURE_AD_CALLBACK_URL'),
      scope: ['User.Read'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: (err: any, user?: any, info?: any) => void,
  ): Promise<any> {
    const displayName = profile.displayName;
    const email = profile.emails[0]?.value;
    const givenName = profile.name?.givenName;
    const surname = profile.name?.familyName;

    const user = {
      displayName,
      email,
      givenName,
      surname,
      accessToken,
    };

    done(null, user);
  }
}
