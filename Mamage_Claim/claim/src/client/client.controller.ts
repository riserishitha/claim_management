import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { UserService } from './client.service';
import { AuthService } from '../Authentication/authenticate.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() body: { name: string; email: string; password: string; role: string }) {
    const user = await this.userService.createUser({
      name: body.name,
      email: body.email,
      password: body.password,
      role: body.role,
    });

    const token = this.authService.generateToken({ email: user.email, role: user.role });

    return { user, access_token: token };
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    console.log('Login Request Received:', body);

    const user = await this.userService.findByEmail(body.email);

    if (!user || user.password !== body.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.authService.generateToken({ email: user.email, role: user.role });
    console.log('Returning Token:', token);

    return { user, access_token: token };
  }

  @Post('get-user-id')
  async getUserId(@Body() body: { email: string }) {
    console.log('Received email:', body.email);
    const user = await this.userService.findByEmail(body.email);
    if (!user) {
      console.log('User not found');
      return {};
    }
    return { _id: user._id };
  }
}
