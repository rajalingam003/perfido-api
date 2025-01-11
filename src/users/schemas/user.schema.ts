import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: false })
  agreedToTerms: boolean;

  @Prop({
    type: {
      planId: { type: String, required: true },
    },
    _id: false,
  })
  plan_detail: {
    planId: string;
  };
}

export const UserSchema = SchemaFactory.createForClass(User);
