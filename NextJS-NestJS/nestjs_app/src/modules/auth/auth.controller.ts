import { Controller, Get, Post, Body, ValidationPipe, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import CreateUserDto from '../users/dto/user.create.dto';
import { LocalAuthGuard } from '@/guards/local-auth.guard';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UsersService
    ){}
    @Post('register')
    register(@Body(new ValidationPipe()) userData: CreateUserDto){
        return this.userService.createUser(userData)
    }
    @UseGuards(LocalAuthGuard)
    @Post('login')  
    async login(@Request() request: any){
        return this.authService.login(request.user)
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Request() req: any){
        return req.user
    }
}
