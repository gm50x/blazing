import { IntegrationEvent } from '@blazing/tactical-design';

export class AccountCreatedEvent extends IntegrationEvent {
  constructor(readonly accountId: string) {
    super();
  }
}
