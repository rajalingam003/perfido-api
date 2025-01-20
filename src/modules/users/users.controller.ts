import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  GetUsersQuery,
  UpdateUserDto,
  createUsersDto,
  deleteUserDto,
} from './users.interface';
import { UsersService } from './users.services';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
//import { AuthGuard } from "../auth/auth.guard";
import ResponseFormat from 'src/helpers/responseFormat';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '../auth/auth.guard';
import { UseGuards } from '@nestjs/common';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //Create User
  @Post('/signup')
  @UsePipes(new ValidationPipe())
  public async createUser(@Body() reqBody: createUsersDto) {
    try {
      const user = await this.usersService.createUser(reqBody);
      return ResponseFormat.build(user, 'User Created successfully');
    } catch (error) {
      if (error instanceof HttpException) {
        return ResponseFormat.buildWithMessage(
          error.message,
          error.getStatus(),
        );
      } else {
        console.error(error);
        return ResponseFormat.buildWithMessage(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  //Get All Users
  @Get()
  @HttpCode(HttpStatus.OK)
  public async getAllUsers(@Query('full_name') full_name?: string) {
    try {
      const allUserDetails = await this.usersService.getAllUsers(full_name);
      return ResponseFormat.build(
        allUserDetails,
        'All Users Details Retrieved successfully',
      );
    } catch (error) {
      console.error(error);
      return ResponseFormat.buildWithMessage(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  //Get One Users
  @ApiBearerAuth()
  // @UseGuards(AuthGuard)
  @Get(':id')
  public async getUserById(@Param('id') id: string) {
    try {
      const findUser = await this.usersService.getOneUser(id);
      return ResponseFormat.build(
        findUser,
        'Users Details Retrieve successfully',
      );
    } catch (error) {
      if (error instanceof HttpException) {
        return ResponseFormat.buildWithMessage(
          error.message,
          error.getStatus(),
        );
      } else {
        console.error(error);
        return ResponseFormat.buildWithMessage(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  //Update one Users
  @ApiBearerAuth()
  // @UseGuards(AuthGuard)
  @Put(':id')
  @UsePipes(new ValidationPipe())
  public async updateUserById(
    @Param('id') id: string,
    @Body() reqBody: UpdateUserDto,
  ) {
    try {
      const updateUserDetails = await this.usersService.updateUser(id, reqBody);
      return ResponseFormat.build(
        updateUserDetails,
        'Users Details Updated successfully',
      );
    } catch (error) {
      if (error instanceof HttpException) {
        return ResponseFormat.buildWithMessage(
          error.message,
          error.getStatus(),
        );
      } else {
        console.error(error);
        return ResponseFormat.buildWithMessage(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  //Delete One Users
  @ApiBearerAuth()
  //@UseGuards(AuthGuard)
  @Delete(':id')
  @UsePipes(new ValidationPipe())
  public async deleteUserById(
    @Param('id') id: string,
    @Body() reqBody: deleteUserDto,
  ) {
    try {
      const deleteUserDetails = await this.usersService.deleteUser(id, reqBody);
      return ResponseFormat.build(
        deleteUserDetails,
        'Users Details Deleted successfully',
      );
    } catch (error) {
      if (error instanceof HttpException) {
        return ResponseFormat.buildWithMessage(
          error.message,
          error.getStatus(),
        );
      } else {
        console.error(error);
        return ResponseFormat.buildWithMessage(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
