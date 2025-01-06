import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { MESSAGES } from './common/utils/messages';

@Module({
  imports: [MongooseModule.forRoot(MESSAGES.dbConnection), UsersModule],
})
export class AppModule {}
