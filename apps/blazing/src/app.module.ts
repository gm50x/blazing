import { CommonModule, ContextModule } from '@blazing/ignition';
import { MongooseTransactionalModule } from '@blazing/tactical-design/mongoose';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfig } from './config/app.config';
import { MongooseConfig } from './config/mongoose.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ContextModule.forRoot({}),
    HttpModule,
    CommonModule.forRootAsync({ useClass: AppConfig }),
    MongooseModule.forRootAsync({ useClass: MongooseConfig }),
    MongooseTransactionalModule.forFeature({}),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
