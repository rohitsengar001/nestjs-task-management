import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './tranform.interceptor';

async function bootstrap() {
  const looger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.enableCors();// enable to cors in dev mode but it's not prefer for production mode
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor)
  const listening_port=process.env.PORT;
  await app.listen(listening_port);
  Logger.log(`Application is listening on port ${listening_port}`)
}
bootstrap();
