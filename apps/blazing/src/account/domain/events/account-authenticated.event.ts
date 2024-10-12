import { IntegrationEvent } from '@blazing/tactical-design';

export class AccountAuthenticatedEvent extends IntegrationEvent {
  constructor(readonly accountId: string) {
    super();
  }
}
