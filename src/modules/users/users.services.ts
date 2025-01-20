import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import {
  UpdateUserDto,
  createUsersDto,
  deleteUserDto,
} from './users.interface';
import { UserStatus, users } from './user.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(users.name) private usersModel: Model<users>) {}

  public createUser = async (reqBody: createUsersDto) => {
    const { email } = reqBody;

    const existingUser = await this.usersModel.findOne({ email });
    if (existingUser) {
      throw new BadRequestException('Email is already registered');
    }

    const newUser = await this.usersModel.create({
      ...reqBody,
      isDelete: false,
      status: UserStatus.ACTIVE,
      aggreedToTerms: reqBody.agreedToTerms,
    });
    return newUser;
  };

  public getAllUsers = async (full_name?: string) => {
    const query = { isDelete: false };
    if (full_name) {
      query['full_name'] = { $regex: new RegExp(full_name, 'i') };
    }
    const getAllUsersDetails = await this.usersModel.find(query);
    const data = getAllUsersDetails.map((user) => ({
      userId: user._id,
      full_name: user.full_name,
      email: user.email,
      status: user.status,
    }));

    return data;
  };

  public getOneUser = async (id: string) => {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) {
      throw new BadRequestException('Id is Invalid');
    }
    const getOneUserDetails = await this.usersModel.findOne({
      _id: id,
      isDelete: false,
    });
    if (!getOneUserDetails) {
      throw new BadRequestException('User Not Found');
    }

    return getOneUserDetails;
  };

  public updateUser = async (id: string, updateUserDto: UpdateUserDto) => {
    const isvalid = mongoose.Types.ObjectId.isValid(id);
    if (!isvalid) {
      throw new NotFoundException('Id is Invalid');
    }
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 12);
    }
    const user = await this.usersModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });

    if (!user) {
      throw new BadRequestException('User Not Found');
    }

    return user;
  };

  public deleteUser = async (id: string, reqBody: deleteUserDto) => {
    const isvalid = mongoose.Types.ObjectId.isValid(id);
    if (!isvalid) {
      throw new NotFoundException('Id is Invalid');
    }
    const deleteUserDetails = await this.usersModel.findByIdAndDelete(
      id,
      reqBody,
    );
    if (!deleteUserDetails) {
      throw new BadRequestException('User Not Found');
    }

    return deleteUserDetails;
  };

  public getUserByEmail = async (email: string) => {
    const user = await this.usersModel.findOne({ email });
    if (!user) {
      throw new BadRequestException(`${email} is not found `);
    }
    return user;
  };
}

export default UsersService;
