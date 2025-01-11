import {
  Controller,
  Post,
  Body,
  UseFilters,
  BadRequestException,
  Put,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
@UseFilters(new HttpExceptionFilter())
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.usersService.createUser(createUserDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: CreateUserDto,
  ) {
    if (!Object.keys(updateUserDto).length) {
      throw new BadRequestException('Update data cannot be empty');
    }

    try {
      return await this.usersService.updateUser(id, updateUserDto);
    } catch (error) {
      if (error.message.includes('User not found')) {
        throw new NotFoundException('User not found');
      }
      throw new BadRequestException(error.message);
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    try {
      return await this.usersService.deleteUser(id);
    } catch (error) {
      if (error.message.includes('User not found')) {
        throw new NotFoundException('User not found');
      }
      throw new BadRequestException(error.message);
    }
  }
}
