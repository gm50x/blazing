import { CommonModuleOptions, CommonOptionsFactory } from '@blazing/ignition';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfig implements CommonOptionsFactory {
  constructor(private readonly config: ConfigService) {}

  createOptions(): CommonModuleOptions {
    const appName = this.config.getOrThrow('APP_NAME');
    const appDescription = this.config.getOrThrow('APP_DESCRIPTION');
    const appVersion = this.config.getOrThrow('APP_VERSION');
    const environment = this.config.get('NODE_ENV', 'development');
    const logFormat = this.config.get('LOG_FORMAT', 'json');
    const logLevel = this.config.get('LOG_LEVEL', 'info');
    const logSilent = this.config.get('LOG_SILENT', 'false');
    const httpTrafficInspectionMode = this.config.getOrThrow(
      'TRAFFIC_INSPECTION_HTTP_MODE',
      'all',
    );

    return {
      appName,
      appDescription,
      appVersion,
      environment,
      httpTrafficInspection: {
        mode: httpTrafficInspectionMode,
        allowedOutboundRoutes: ['/foo/bar'],
        allowedOutboundHosts: ['*.requestinspector.com'],
      },
      logger: {
        format: logFormat,
        level: logLevel,
        silent: logSilent === 'true',
      },
    };
  }
}
