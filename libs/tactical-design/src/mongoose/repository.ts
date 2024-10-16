import { Injectable } from '@nestjs/common';
import { ClientSession, FilterQuery, Model, Types } from 'mongoose';
import { Entity } from '../core/entity';
import { EntitySchemaFactory } from '../core/entity-schema.factory';
import { Repository } from '../core/repository';
import { TransactionManager } from '../core/transaction.manager';
import { EntityMongooseSchema } from './entity.schema';

@Injectable()
export abstract class MongooseRepository<
  TSchema extends EntityMongooseSchema,
  TEntity extends Entity,
> implements Repository<TEntity>
{
  constructor(
    protected readonly transactionManager: TransactionManager,
    protected readonly entityModel: Model<TSchema>,
    protected readonly entitySchemaFactory: EntitySchemaFactory<
      TSchema,
      TEntity
    >,
  ) {}

  async findById(id: string): Promise<TEntity> {
    return this.findOne({
      _id: new Types.ObjectId(id),
    });
  }

  async findAll(): Promise<TEntity[]> {
    return this.find({});
  }

  protected async find(
    entityFilterQuery?: FilterQuery<TSchema>,
  ): Promise<TEntity[]> {
    const foundValues = await this.entityModel
      .find(entityFilterQuery, {}, { lean: true })
      .exec();
    return foundValues.map((entityDocument) =>
      this.entitySchemaFactory.createFromSchema(entityDocument as TSchema),
    );
  }

  async create(entity: TEntity): Promise<void> {
    const session = this.getSession();
    const schema = this.entitySchemaFactory.create(entity);
    await new this.entityModel(schema).save({ session });
  }

  async update(entity: TEntity): Promise<void> {
    const session = this.getSession();
    const schema = this.entitySchemaFactory.create(entity);
    await this.entityModel.updateOne({ _id: schema._id }, schema, { session });
  }

  protected async findOne(
    entityFilterQuery?: FilterQuery<TSchema>,
  ): Promise<TEntity> {
    const entityDocument = await this.entityModel
      .findOne(entityFilterQuery, {}, { lean: true })
      .exec();

    if (!entityDocument) {
      return;
    }

    return this.entitySchemaFactory.createFromSchema(entityDocument as TSchema);
  }

  protected getSession(): ClientSession | undefined {
    return this.transactionManager.getRunningTransactionOrDefault()
      ?.hostTransaction;
  }
}
