import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ApplicationModule } from '../application/application.module';
import { HandleAccountCreatedController } from './amqp-drivers/controllers/handle-account-created.controller';
import { ChangePasswordController } from './http-drivers/controllers/change-password.controller';
import { GetAccountController } from './http-drivers/controllers/get-account.controller';
import { SignInController } from './http-drivers/controllers/sign-in.controller';
import { SignUpController } from './http-drivers/controllers/sign-up.controller';

const HttpControllers = [
  SignUpController,
  SignInController,
  ChangePasswordController,
  GetAccountController,
];
const AmqpControllers = [
  // :: KeepStyle ::
  HandleAccountCreatedController,
];

@Module({
  imports: [CqrsModule, ApplicationModule],
  controllers: [...HttpControllers],
  providers: [...AmqpControllers],
})
export class DriversModule {}
