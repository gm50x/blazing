import { AmqpModuleOptions } from '../amqp.factory';
import { AmqpParams } from './amqp-params.util';

const toDottedNotation = (value: string) => {
  const values = [value[0].toLowerCase()];
  for (let i = 1; i < value.length; i++) {
    const thisCharacter = value[i];
    if (['-', '.', '_'].includes(thisCharacter)) {
      values.push('.');
    } else if (thisCharacter === thisCharacter.toUpperCase()) {
      values.push('.', thisCharacter.toLowerCase());
    } else {
      values.push(thisCharacter);
    }
  }
  return values.join('');
};

const withPrefix = (prefix: string, value: string) => {
  const values = [];
  if (prefix) {
    values.push(toDottedNotation(prefix));
  }
  values.push(value);

  return values.join('.');
};

export const getDelayedRetrialExchange = (prefix: string) => ({
  name: withPrefix(prefix, AmqpParams.DelayedExchange),
  type: 'x-delayed-message',
  options: { arguments: { 'x-delayed-type': 'topic' } },
});

export const getRerouterQueueName = (prefix: string) => ({
  name: withPrefix(prefix, AmqpParams.RerouterQueue),
  exchange: AmqpParams.DelayedExchange,
  routingKey: '#',
  options: {
    arguments: { 'x-message-ttl': 0 },
    deadLetterExchange: AmqpParams.DefaultExchange,
  },
});

export const AMQP_INTERNAL_DEFAULT_CHANNEL: AmqpModuleOptions['channels'][number] =
  {
    name: 'AMQP_INTERNAL_DEFAULT_CHANNEL',
    default: true,
    prefetchCount: 1,
  };
