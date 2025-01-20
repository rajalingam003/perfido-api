import { ILogin } from './auth.interface';
import { UsersService } from '../users/users.services';
import {
  BadRequestException,
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(forwardRef(() => UsersService))
    private readonly usersServices: UsersService,
    private readonly config: ConfigService,
  ) {}

  public async login(payload: ILogin) {
    const { email, password } = payload;

    const user = await this.usersServices.getUserByEmail(email);
    const userId = user._id;

    // if (!(await user.correctPassword(password, user.password))) {
    //   throw new BadRequestException("Password don't match");
    // }

    let token = await this.generateToken(email);

    return {
      userId: user._id,
      accessToken: token.accessToken,
      refreshToken: token.refreshToken,
    };
  }

  public generateToken(email: string) {
    let token = this.jwtService.sign(
      { email },
      {
        secret: this.config.get('JWT_SECRET'),
        expiresIn: this.config.get('JWT_EXPIRES_IN'),
      },
    );

    let refreshToken = this.jwtService.sign(
      { email },
      {
        secret: this.config.get('JWT_SECRET_REF'),
        expiresIn: this.config.get('JWT_EXPIRES_REF_IN'),
      },
    );

    return {
      accessToken: token,
      refreshToken,
    };
  }

  public async googleLogin(req) {
    const email = req.user.email;
    const full_name = req.user.full_name;
  }

  public githubLogin(req) {
    if (!req.user) {
      return 'No User from GitHub';
    }
    return {
      message: 'User Info from GitHub',
      user: req.user,
    };
  }
  public microsoftLogin(req) {
    if (!req.user) {
      return 'No User from Microsoft';
    }
    return {
      message: 'User Info from Microsoft',
      user: req.user,
    };
  }
}
