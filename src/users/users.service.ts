import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from './users.repository';
import { MESSAGES } from '../common/utils/messages';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(createUserDto: CreateUserDto): Promise<any> {
    const { email, password, agreedToTerms, plan_detail } = createUserDto;

    const existingUser = await this.usersRepository.findByEmail(email);
    if (existingUser) {
      throw new ConflictException(MESSAGES.emailExists);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
      agreedToTerms,
      plan_detail,
    });
  }

  async updateUser(
    userId: string,
    updateUserDto: Partial<CreateUserDto>,
  ): Promise<any> {
    const existingUser = await this.usersRepository.findById(userId);
    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    const updatedUser = await this.usersRepository.updateById(
      userId,
      updateUserDto,
    );

    if (!updatedUser) {
      throw new BadRequestException('Failed to update user');
    }

    return {
      status: 'success',
      message: 'User updated successfully',
      data: updatedUser,
    };
  }

  async deleteUser(userId: string): Promise<any> {
    const existingUser = await this.usersRepository.findById(userId);
    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    await this.usersRepository.deleteById(userId);
    return {
      status: 'success',
      message: 'User deleted successfully',
    };
  }
}
