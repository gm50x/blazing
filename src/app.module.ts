import { ContextModule } from '@fiap-burger/core';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ContextModule.forRoot({})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
