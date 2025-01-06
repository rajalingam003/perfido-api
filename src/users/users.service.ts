import { Injectable, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from './users.repository';
import { MESSAGES } from '../common/utils/messages';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(createUserDto: CreateUserDto): Promise<any> {
    const { email, password, confirmPassword, agreedToTerms } = createUserDto;

    const existingUser = await this.usersRepository.findByEmail(email);
    if (existingUser) {
      throw new ConflictException(MESSAGES.emailExists);
    }

    if (password !== confirmPassword) {
      throw new ConflictException(MESSAGES.passwordMismatch);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
      agreedToTerms,
    });
  }
}
