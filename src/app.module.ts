import { CommonModule, ContextModule } from '@fiap-burger/startup-utils';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ContextModule.forRoot({}),
    CommonModule.forRoot({
      // TODO: must go to config class
      appName: 'FiapBurger',
      appVersion: '1.0.0',
      environment: 'dev',
      logger: { format: 'pretty', level: 'debug' },
      httpTrafficInspection: { mode: 'all' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
