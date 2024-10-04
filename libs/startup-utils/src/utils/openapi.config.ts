import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MODULE_OPTIONS_TOKEN } from '../common/common.builder';
import { CommonModuleOptions } from '../common/common.options';

export const configureOpenAPI = (app: INestApplication) => {
  const options = app.get<CommonModuleOptions>(MODULE_OPTIONS_TOKEN);
  const version = `v${options.appVersion ?? '1.0.0'}-${options.environment ?? 'development'}`;
  const config = new DocumentBuilder()
    .setTitle(options.appName ?? 'App')
    .setDescription(options.appDescription ?? 'A Nestjs Application')
    .setVersion(version)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(options.openAPIRoute ?? 'docs', app, document);
  return app;
};
