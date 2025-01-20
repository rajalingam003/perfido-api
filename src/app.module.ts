import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PlanModule } from './plan/plan.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env-example',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule, PlanModule, UsersModule, AuthModule],
      useFactory: (configService: ConfigService) => {
        const uri = configService.get<string>('DB_URL');
        console.log('DB_URL:', uri);
        if (!uri) {
          throw new Error('DB_URL is not defined in the environment variables');
        }
        return {
          uri,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
