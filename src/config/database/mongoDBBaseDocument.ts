import { Prop, Schema } from '@nestjs/mongoose';
import { Document as MongooseDocument } from 'mongoose';
import { now } from '../../helpers/utils';

@Schema({ toJSON: { virtuals: true }, toObject: { virtuals: true } })
export class Timestamps {
  @Prop({ default: now })
  createdAt?: number;

  @Prop({ default: now })
  updatedAt?: number;
}
