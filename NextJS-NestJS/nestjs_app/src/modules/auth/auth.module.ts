import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '@/passports/local.strategy';

@Module({ 
  imports:
    [
      UsersModule,
      PassportModule,
      JwtModule.register({
        secret: '123',
        signOptions: { expiresIn: '1h' }
      })
    ],
  controllers:[AuthController],
  // providers: [AuthService, LocalStrategy, JwtStrategy]
  providers: [AuthService, LocalStrategy]
})
export class AuthModule {}
