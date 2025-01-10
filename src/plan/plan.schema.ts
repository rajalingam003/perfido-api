import { Schema } from 'mongoose';

export const PlanSchema = new Schema({
  plan_name: { type: String, required: true },
  price: { type: Schema.Types.Mixed, required: true },
  features: {
    virtual_users: {
      type: Schema.Types.Mixed,
      required: true,
      validate: {
        validator: (value: any) =>
          typeof value === 'number' || value === 'Unlimited',
        message: 'virtual_users must be a number or "Unlimited"',
      },
    },

    load_generators: { type: Number, required: true },
    max_test_duration: { type: String, required: true },
    data_retention: { type: String, required: true },
    debug_runs: { type: String, required: true },
    apm_integrations: { type: Boolean, required: true },
    baseline_comparison: { type: Boolean, required: true },
    private_ips: { type: Boolean, required: true },
    support_tier: { type: String, required: true },
  },
});

export interface Plan extends Document {
  plan_name: string;
  price: number | string;
  features: {
    virtual_users: number | string;
    load_generators: number;
    max_test_duration: string;
    data_retention: string;
    debug_runs: string;
    apm_integrations: boolean;
    baseline_comparison: boolean;
    private_ips: boolean;
    support_tier: string;
  };
}
