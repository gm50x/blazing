import { AmqpService } from '@blazing/amqp';
import { Inject, Injectable, Logger, forwardRef } from '@nestjs/common';
import { Constructor } from '@nestjs/cqrs';
import { AggregateEvent } from '../core/aggregate-event';
import { AggregateRoot, PublisherContext } from '../core/aggregate-root';
import { MODULE_OPTIONS_TOKEN } from './amqp-publisher-context.module-builder';
import { AmqpPublisherContextModuleOptions } from './amqp-publisher.factory';
import { routingKeyOf, toDottedNotation } from './amqp-publisher.utils';

@Injectable()
export class AmqpPublisherContext implements PublisherContext {
  private readonly logger = new Logger(this.constructor.name);
  private readonly eventBusName: string;

  constructor(
    private readonly amqp: AmqpService,
    @Inject(forwardRef(() => MODULE_OPTIONS_TOKEN))
    private readonly options: AmqpPublisherContextModuleOptions,
  ) {
    this.eventBusName = toDottedNotation(options.eventBusName);
  }

  private async publishAll(events: AggregateEvent[]) {
    this.logger.debug(
      `Publishing ${events.length} to the event bus ${this.eventBusName}`,
    );
    await Promise.all(
      events.map((x) =>
        this.amqp.publish(
          this.eventBusName,
          routingKeyOf(x),
          x, // TODO: append headers for event
        ),
      ),
    );
    this.logger.log(`Published ${events.length} to the event bus`);
  }

  /**
   * Merges the event publisher into the provided object.
   * This is required to make `publishAll` available on `AggregateRoot`.
   * @param object The object to merge into.
   */
  mergeObjectContext<T extends AggregateRoot>(object: T): T {
    object['publishAll'] = this.publishAll.bind(this);
    return object;
  }

  /**
   * Merges the event publisher into the provided class.
   * This is required to make `publishAll` available on `AggregateRoot`.
   * @param Class The class to merge into.
   */
  mergeClassContext<T extends Constructor<AggregateRoot>>(Class: T): T {
    const publishAll = this.publishAll.bind(this);
    return class extends Class {
      protected async publishAll(events: AggregateEvent[]) {
        await publishAll(events);
      }
    };
  }
}
