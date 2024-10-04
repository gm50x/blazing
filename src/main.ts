import { configureContextWrappers } from '@fiap-burger/core';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule).then(
    configureContextWrappers,
  );

  await app.listen(3000);
}
bootstrap();
