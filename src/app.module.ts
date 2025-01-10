import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { MESSAGES } from './common/utils/messages';
import { PlanModule } from './plan/plan.module';

@Module({
  imports: [
    MongooseModule.forRoot(MESSAGES.dbConnection),
    UsersModule,
    PlanModule,
  ],
})
export class AppModule {}
