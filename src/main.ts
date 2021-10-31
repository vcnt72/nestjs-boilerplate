import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { CustomResponseValidationPipe } from './utils/pipe/custom-response-validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.use(helmet());
  app.useGlobalPipes(new CustomResponseValidationPipe());
  app.setGlobalPrefix('api');
  app.enableShutdownHooks();
  await app.listen(3000);
}
bootstrap();
