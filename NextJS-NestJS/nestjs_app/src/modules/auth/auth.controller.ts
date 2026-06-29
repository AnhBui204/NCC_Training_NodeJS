import { Controller, Get, Post, Body, ValidationPipe, Request, UseGuards, Res, Req, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import CreateUserDto from '../users/dto/user.create.dto';
import { LocalAuthGuard } from '@/guards/local-auth.guard';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { JwtRefreshGuard } from '@/guards/jwt-refresh.guard';
import type { Response, Request as ExpressRequest } from 'express';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UsersService
    ) { }
    @Post('register')
    register(@Body(new ValidationPipe()) userData: CreateUserDto) {
        return this.userService.createUser(userData)
    }
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() request: any, @Res({ passthrough: true }) res: Response) {
        const tokens = await this.authService.login(request.user)
        res.cookie('refresh_token', tokens.refresh_token, {
            path: '/',
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return { access_token: tokens.access_token }
    }

    @UseGuards(JwtRefreshGuard)
    @Post('refresh')
    async refresh(@Req() req: any) {
        return this.authService.createNewAccessToken(req.user);
    }


    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Request() req: any) {
        return req.user
    }

    @UseGuards(JwtAuthGuard)
    @Post('logout')
    async logout(@Request() req: any, @Res({ passthrough: true }) res: Response) {
        await this.userService.updateRefreshToken(req.user._id || req.user.id, null);
        res.clearCookie('refresh_token', {
            path: '/',
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            expires: new Date(0),
        });
        return { message: 'Đăng xuất thành công' };
    }
}
