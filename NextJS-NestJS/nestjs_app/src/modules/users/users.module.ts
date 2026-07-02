import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseService } from '@/db/database.service';
import { User, UserSchema } from '../../entities/schemas/users.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema
      }
    ])
  ],
  providers: [UsersService, DatabaseService],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule { }
