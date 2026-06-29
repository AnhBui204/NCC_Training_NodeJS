import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Strategy, ExtractJwt } from "passport-jwt";
import { UsersService } from "src/modules/users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ingnoreExpiration: false,
            secretOrKey: process.env.JWT_ACCESS_SECRET
        });
    }

    async validate(payload: any) {
        const user = await this.usersService.findUserByEmail(payload.email)
        if (!user) {
            throw new UnauthorizedException("User not found")
        }
        return user
    }
}