import { CommonModule, ContextModule } from '@fiap-burger/ignition';
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
      appName: 'FiapBurgerItems',
      appVersion: '1.0.0',
      appDescription: 'Provides Items Catalog for FiapBurger',
      environment: 'development',
      logger: { format: 'pretty', level: 'debug' },
      httpTrafficInspection: { mode: 'all' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
