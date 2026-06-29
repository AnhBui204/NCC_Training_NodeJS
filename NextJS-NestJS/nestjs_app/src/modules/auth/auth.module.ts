import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '@/passports/local.strategy';
import { JwtStrategy } from '@/passports/jwt.strategy';
import { JwtRefreshStrategy } from '@/passports/jwt-refresh.strategy';
@Module({
  imports:
    [
      UsersModule,
      PassportModule,
      JwtModule.register({
        secret: process.env.JWT_ACCESS_SECRET,
        signOptions: { expiresIn: '1h' }
      })
    ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshStrategy]
})
export class AuthModule { }
