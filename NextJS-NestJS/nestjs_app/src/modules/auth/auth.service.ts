import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    async validateUsers(email: string, password: string): Promise<any> {
        return this.usersService.validateUser(email, password)
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id || user._id, role: user.role }
        const [accessToken, refreshToken] = await Promise.all
            ([
                this.jwtService.signAsync(payload, {
                    secret: process.env.JWT_ACCESS_SECRET, expiresIn: '1h'
                }),
                this.jwtService.signAsync(payload, {
                    secret: process.env.JWT_REFRESH_SECRET, expiresIn: '7d'
                })
            ])
        await this.usersService.updateRefreshToken(user._id || user.id, refreshToken);
        return {
            access_token: accessToken,
            refresh_token: refreshToken
        }
    }

    async refreshToken(oldRefreshToken: string) {
        try {
            const payload = await this.jwtService.verifyAsync(oldRefreshToken, {
                secret: process.env.JWT_REFRESH_SECRET,
            })
            const newAccessToken = await this.jwtService.signAsync({
                email: payload.email, sub: payload.sub
            },
                {
                    secret: process.env.JWT_ACCESS_SECRET, expiresIn: '1h'
                }
            )
            return { access_token: newAccessToken }
        } catch (error) {
            throw new UnauthorizedException("Refresh token is Expires or Invalid!")
        }
    }

    async createNewAccessToken(user: any) {
        const payload = { email: user.email, sub: user._id || user.id, role: user.role };
        const newAccessToken = await this.jwtService.signAsync(payload, {
            secret: process.env.JWT_ACCESS_SECRET,
            expiresIn: '15m'
        });
        return { access_token: newAccessToken };
    }

}
