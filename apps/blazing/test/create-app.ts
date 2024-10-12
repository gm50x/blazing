import { createTestApp as baseCreateTestApp } from '@blazing/test-factory/utils';
import { AppModule } from '../src/app.module';

export const env = {
  APP_NAME: 'test-blazing-app',
  AMQP_EXCHANGE_EVENT_ROOT: 'test.events',
};

export const createTestApp = (silentLogger: boolean = true) =>
  baseCreateTestApp(AppModule, { env, silentLogger });
