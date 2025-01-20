import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { UsersService } from 'src/modules/users/users.services';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
  ) {
    super({
      clientID: configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get('GOOGLE_CALLBACK_URL'),

      scope: [
        'email',
        'profile',
        // 'https://www.googleapis.com/auth/user.phonenumbers.read',
      ],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    console.log('Profile object:', profile);

    try {
      const { name, emails, photos, id } = profile;

      const user = {
        UniqueId: String(id),
        email: emails[0].value,
        full_name: name.givenName,
        photo: photos,
        accessToken: accessToken,
      };

      console.log('User object:', user);

      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }
}
