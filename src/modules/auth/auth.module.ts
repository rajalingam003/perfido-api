import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.services';
import { UsersModule } from '../users/users.module';
import { GoogleStrategy } from './strategy/googleStrategy';
import { GithubStrategy } from './strategy/githubStrategy';
import { MicrosoftStrategy } from './strategy/microsoftStrategy';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: 'JWT_EXPIRES_IN' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    // GoogleStrategy,
    // GithubStrategy,
    // MicrosoftStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
