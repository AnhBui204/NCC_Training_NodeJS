import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingMiddleware } from './middleware/logging/logging.middleware';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(new LoggingMiddleware().use)    //Dùng middleware cho toàn bộ app
  app.use(cookieParser())
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true
  })
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
