import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const existingUser = await this.userModel.findOne({
        email: createUserDto.email,
      });
      if (existingUser) {
        throw new ConflictException('Email already exists');
      }

      const createdUser = new this.userModel(createUserDto);
      return createdUser.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Duplicate entry detected');
      }
      throw error;
    }
  }

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    if (!users || users.length === 0) {
      throw new NotFoundException('No users found');
    }
    return users;
  }
}
