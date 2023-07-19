import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from '../services';
import { GithubGuard, GoogleGuard, JwtAuthGuard } from '../guards';
import { User } from '../../modules/users';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() dto: User) {
    return await this.authService.signIn(dto);
  }

  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() dto: User) {
    return await this.authService.signUp(dto);
  }

  @Get('github')
  @UseGuards(GithubGuard)
  async github() {}

  @Get('github/callback')
  @UseGuards(GithubGuard)
  async githubCb(@Req() req: Request, @Res() res: Response) {
    const encodedUser = encodeURIComponent(JSON.stringify(req.user));
    res.redirect(`http://localhost:4200/overview?data=${encodedUser}`);
  }

  @Get('/google')
  @UseGuards(GoogleGuard)
  async google() {}

  @Get('/google/callback')
  @UseGuards(GoogleGuard)
  async googleCb(@Req() req: Request, @Res() res: Response) {
    const encodedUser = encodeURIComponent(JSON.stringify(req.user));
    res.redirect(`http://localhost:4200/overview?data=${encodedUser}`);
  }

  @Get('profile')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async me(@Req() req: Request) {
    return req.user;
  }
}
