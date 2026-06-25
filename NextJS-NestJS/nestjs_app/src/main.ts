import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingMiddleware } from './middleware/logging/logging.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(new LoggingMiddleware().use)    //Dùng middleware cho toàn bộ app
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
