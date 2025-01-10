import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlanSchema } from './plan.schema';
import { PlanService } from './plan.service';
import { PlanController } from './plan.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Plan', schema: PlanSchema }])],
  controllers: [PlanController],
  providers: [PlanService],
})
export class PlanModule {}
