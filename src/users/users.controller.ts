import {
  Controller,
  Post,
  Get,
  Body,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    if (!createUserDto.name || !createUserDto.email) {
      throw new BadRequestException('Name and Email are required');
    }
    return await this.usersService.create(createUserDto);
  }

  @Get()
  async getAllUsers(): Promise<User[]> {
    try {
      return await this.usersService.findAll();
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException(
          error.message || 'Failed to fetch users',
        );
      }
    }
  }
}
