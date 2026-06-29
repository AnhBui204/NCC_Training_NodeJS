import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Request } from 'express';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor(private readonly usersService: UsersService) {
        super({

            jwtFromRequest: ExtractJwt.fromExtractors([
                (req: Request) => req?.cookies?.['refresh_token'] || req?.body?.refresh_token,
            ]),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_REFRESH_SECRET,
            passReqToCallback: true,
        });
    }

    async validate(req: Request, payload: any) {
        const refreshToken = req?.cookies?.['refresh_token'] || req?.body?.refresh_token;
        if (!refreshToken) {
            throw new UnauthorizedException('Không tìm thấy Refresh Token');
        }

        const user = await this.usersService.getUserIfRefreshTokenMatches(refreshToken, payload.sub);
        if (!user) {
            throw new UnauthorizedException('Refresh Token không hợp lệ hoặc đã bị thu hồi!');
        }

        return user;
    }
}
