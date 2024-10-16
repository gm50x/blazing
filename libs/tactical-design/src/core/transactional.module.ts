import { ConfigurableModuleBuilder, Module, Type } from '@nestjs/common';
import { getTransactionToken } from './transaction-manager.token';
import { TransactionManager } from './transaction.manager';

type TransactionalModuleOptions = object;
export type TransactionalModuleExtraOptions = {
  isGlobal?: boolean;
  connectionName?: string;
  databaseProvider?: string;
  TransactionManagerAdapter: Type<TransactionManager>;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { ConfigurableModuleClass } =
  new ConfigurableModuleBuilder<TransactionalModuleOptions>()
    .setClassMethodName('forFeature')
    .setFactoryMethodName('createTransactionalOptions')
    .setExtras(null, (definitions, extras: TransactionalModuleExtraOptions) => {
      const { TransactionManagerAdapter, connectionName, databaseProvider } =
        extras;
      const TransactionManagerToken = getTransactionToken(
        connectionName,
        databaseProvider,
      );
      return {
        ...definitions,
        global: true,
        providers: [
          ...(definitions.providers || []),
          {
            provide: TransactionManagerToken,
            useClass: TransactionManagerAdapter,
          },
        ],
        exports: [...(definitions.exports || []), TransactionManagerToken],
      };
    })
    .build();

@Module({})
export class TransactionalModule extends ConfigurableModuleClass {}
