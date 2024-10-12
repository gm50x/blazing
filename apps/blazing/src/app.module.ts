import { AmqpModule } from '@blazing/amqp';
import { CommonModule, ContextModule } from '@blazing/ignition';
import { AmqpPublisherContextModule } from '@blazing/tactical-design/amqp';
import { MongooseTransactionalModule } from '@blazing/tactical-design/mongoose';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountModule } from './account/account.module';
import { AmqpConfig, AmqpPublisherConfig } from './config/amqp.config';
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
    AmqpModule.forRootAsync({ useClass: AmqpConfig }),
    AmqpPublisherContextModule.forFeatureAsync({
      useClass: AmqpPublisherConfig,
    }),
    // :: Add Application Modules ::
    AccountModule,
  ],
})
export class AppModule {}
