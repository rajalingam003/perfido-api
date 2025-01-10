import { Controller, Post, Get, Res, HttpStatus } from '@nestjs/common';
import { PlanService } from './plan.service';
import { Response } from 'express';

@Controller('plans')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Get()
  async getAllPlans(@Res() res: Response) {
    try {
      const plans = await this.planService.getAllPlans();
      return res.status(HttpStatus.OK).json({
        success: true,
        data: plans,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message || 'An error occurred while retrieving plans',
      });
    }
  }

  @Post('create')
  async createPlans() {
    const plansData = [
      {
        plan_name: 'Guest',
        price: 0,
        features: {
          virtual_users: 50,
          load_generators: 1,
          max_test_duration: '20 mins',
          data_retention: '1 Week',
          debug_runs: 'Unlimited',
          apm_integrations: false,
          baseline_comparison: false,
          private_ips: false,
          support_tier: 'Base Tier Support',
        },
      },
      {
        plan_name: 'Startup',
        price: 500,
        features: {
          virtual_users: 5000,
          load_generators: 20,
          max_test_duration: '5 hours',
          data_retention: '6 Months',
          debug_runs: 'Unlimited',
          apm_integrations: true,
          baseline_comparison: false,
          private_ips: false,
          support_tier: 'Standard Tier Support',
        },
      },
      {
        plan_name: 'Enterprise',
        price: 'Flexible',
        features: {
          virtual_users: 'Unlimited',
          load_generators: 50,
          max_test_duration: '10+ hours',
          data_retention: 'Unlimited',
          debug_runs: 'Unlimited',
          apm_integrations: true,
          baseline_comparison: false,
          private_ips: false,
          support_tier: 'Pro Tier Support',
        },
      },
    ];

    for (const planData of plansData) {
      await this.planService.createPlan(planData);
    }

    return { message: 'Plans added successfully' };
  }
}
