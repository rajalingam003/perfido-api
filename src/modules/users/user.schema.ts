import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
//import { Timestamps } from "src/config/database/mongoDBBaseDocument";
// export enum UserRole {
//     ADMIN = 'admin',
//     USER = 'user',
//     GUEST = 'guest',
//   }

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Schema({ timestamps: true })
export class users {
  // @Prop({required: true})
  // username: string;

  @Prop({ required: true })
  full_name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  isDelete: Boolean;

  @Prop({ type: String, enum: UserStatus })
  status: UserStatus;

  @Prop({
    type: {
      planId: { type: String, required: true },
    },
    _id: false,
  })
  plan_detail: {
    planId: string;
  };

  @Prop({ default: false })
  aggreedToTerms: Boolean;
}

export const usersSchema = SchemaFactory.createForClass(users);

usersSchema.pre('save', { document: true }, async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);

  next();
});

usersSchema.method(
  'correctPassword',
  async function (typedPassword: string, originalPassword: string) {
    return await bcrypt.compare(typedPassword, originalPassword);
  },
);

export const UsersSchema = usersSchema;
