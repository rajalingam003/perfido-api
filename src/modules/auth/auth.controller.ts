import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, Res, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.services";
import { ILogin } from "./auth.interface";
import { Public } from "./auth.guard";
import { AuthGuard } from "@nestjs/passport";
import ResponseFormat from "src/helpers/responseFormat";
import { UsersService } from "../users/users.services";

@ApiTags('Auth')
@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private readonly usersService: UsersService) {}

  @Public()
  @Post('/signin')
  public async login(@Body() reqBody: ILogin) {
    try {
      const userDetails = await this.authService.login(reqBody);
    return ResponseFormat.build(userDetails, "Login successfully");
    } catch (error) {
      console.log(error)
      if (error instanceof HttpException) {
        return ResponseFormat.buildWithMessage(error.message, error.getStatus()); 
      } else {
        console.error(error);
        return ResponseFormat.buildWithMessage("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
    
  }

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('/google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req,) {
    try{
    const user = await this.usersService.getUserByEmail(req.user.email);
    const token = await this.authService.generateToken(user.email)
    // return this.authService.googleLogin(req);
    return ResponseFormat.build(token, "Google Authenticate successfully Login");
  } catch (error) {
    if (error instanceof HttpException) {
      return ResponseFormat.buildWithMessage(error.message, error.getStatus()); 
    } else {
      console.error(error);
      return ResponseFormat.buildWithMessage("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  }

  @Get('/github')
  @UseGuards(AuthGuard('github'))
  async githubAuth(@Req() req) {}

  @Get('/github/callback')
  @UseGuards(AuthGuard('github'))
  async githubAuthRedirect(@Req() req) {
    try{
      const user = await this.usersService.getUserByEmail(req.user.email);
      const token = await this.authService.generateToken(user.email);
      return ResponseFormat.build(token, "Github Authenticate Login successfully");
    } catch (error) {
      if (error instanceof HttpException) {
        return ResponseFormat.buildWithMessage(error.message, error.getStatus()); 
      } else {
        console.error(error);
        return ResponseFormat.buildWithMessage("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
    // return this.authService.githubLogin(req);
  }

  @Get('microsoft')
  @UseGuards(AuthGuard('microsoft'))
  async microsoftAuth() {
  }

  @Get('microsoft/callback')
  @UseGuards(AuthGuard('microsoft'))
  async microsoftCallback(@Req() req) {
    try{
      const user = await this.usersService.getUserByEmail(req.user.email);
      const token = await this.authService.generateToken(user.email)
      return ResponseFormat.build(token, "Microsoft Authenticate Login successfully");
    } catch (error) {
      if (error instanceof HttpException) {
        return ResponseFormat.buildWithMessage(error.message, error.getStatus()); 
      } else {
        console.error(error);
        return ResponseFormat.buildWithMessage("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
      }
    // return  this.authService.microsoftLogin(req)
  }
  
}
}