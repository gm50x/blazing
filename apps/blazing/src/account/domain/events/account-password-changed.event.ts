import { IntegrationEvent } from '@blazing/tactical-design';

export class AccountPasswordChangedEvent extends IntegrationEvent {
  constructor(readonly accountId: string) {
    super();
  }
}
