import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './modules/cats/cats.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [CatsModule, UsersModule]
})
export class AppModule {}
