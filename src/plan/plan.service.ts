import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Plan } from './plan.schema';

@Injectable()
export class PlanService {
  constructor(@InjectModel('Plan') private readonly planModel: Model<Plan>) {}

  async getPlanById(planId: string): Promise<Plan> {
    return this.planModel.findById(planId).exec();
  }

  async getAllPlans(): Promise<Plan[]> {
    try {
      const plans = await this.planModel.find().exec();
      return plans;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to fetch plans from the database',
      );
    }
  }
  async createPlan(planData: any): Promise<Plan> {
    const newPlan = new this.planModel(planData);
    return newPlan.save();
  }
}
