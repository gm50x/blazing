import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { GetHelloNameSuiteSteps } from './step-definitions/get-hello-name-suite.steps';
import { GetHelloWorldSuiteSteps } from './step-definitions/get-hello-world-suite.steps';
// import { GlobalHooks } from './step-definitions/global-hooks';
// import { RunHooksSteps } from './step-definitions/run-hooks.steps';
// import { ScenarioScopedSuiteSteps } from './step-definitions/scenario-scoped-suite.steps';

@Module({
  imports: [HttpModule],
  providers: [
    GetHelloWorldSuiteSteps,
    GetHelloNameSuiteSteps,
    // ScenarioScopedSuiteSteps,
    // RunHooksSteps,
    // GlobalHooks,
  ],
})
export class AppModule {}
