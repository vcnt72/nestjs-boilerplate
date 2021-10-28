import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import { CustomResponseValidationPipe } from './utils/pipe/custom-response-validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.use(helmet());
  app.useGlobalPipes(new CustomResponseValidationPipe());

  await app.listen(3000);
}
bootstrap();
