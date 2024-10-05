import { createNestApp } from '@fiap-burger/ignition';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await createNestApp(AppModule);

  await app.listen(3000);
}
bootstrap();
