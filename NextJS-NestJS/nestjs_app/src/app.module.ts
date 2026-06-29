import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './modules/cats/cats.module';
import { UsersModule } from './modules/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggingMiddleware } from './middleware/logging/logging.middleware';
import { AuthController } from './modules/auth/auth.controller';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.local'
    }),
    MongooseModule.forRoot(
      'mongodb://localhost:27017/basic_nestjs',
      {
        autoIndex: true
      }
    ),
    CatsModule, UsersModule, AuthModule]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes(   //consumer.apply(LoggingMiddleware).forRoutes('*')    áp dụng cho toàn bộ app
      {
        path: '/users',
        method: RequestMethod.ALL
      }
      //,
      // {
      //   path: '/users/*',
      //   method: RequestMethod.ALL
      // }
    )
  }
}
