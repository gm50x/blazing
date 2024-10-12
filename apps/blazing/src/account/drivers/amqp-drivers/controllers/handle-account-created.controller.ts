import {
  AmqpPayload,
  AmqpRetrialPolicy,
  AmqpSubscription,
} from '@blazing/amqp';
import { Injectable } from '@nestjs/common';
import { setTimeout } from 'timers/promises';
import { HandleAccountCreatedInput } from '../../../application/dtos/handle-account-created.dto';

@Injectable()
export class HandleAccountCreatedController {
  @AmqpSubscription({
    exchange: 'blazing.app.events',
    routingKey: 'account.created',
    queue: 'blazing.app.account.created',
  })
  @AmqpRetrialPolicy({
    delay: 5000,
    maxAttempts: 5,
    maxDelay: 5000,
  })
  async execute(@AmqpPayload() message: HandleAccountCreatedInput) {
    await setTimeout(500);
    console.log('Got a message', message);
  }
}
