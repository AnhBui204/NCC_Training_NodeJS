import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UsersService } from '../users/users.service';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../entities/schemas/users.schema';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: User.name, schema: UserSchema
    }]), UsersModule
  ],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule { }
