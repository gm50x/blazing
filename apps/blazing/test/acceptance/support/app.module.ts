import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { GetHelloSuiteSteps } from './step-definitions/get-hello-name.steps';
import { IsItFridayYetSuiteSteps } from './step-definitions/is-it-friday-yet.steps';
// import { GlobalHooks } from './step-definitions/global-hooks';
// import { RunHooksSteps } from './step-definitions/run-hooks.steps';
// import { ScenarioScopedSuiteSteps } from './step-definitions/scenario-scoped-suite.steps';

@Module({
  imports: [HttpModule],
  providers: [
    IsItFridayYetSuiteSteps,
    GetHelloSuiteSteps,
    // GetHelloWorldSuiteSteps,
    // GetHelloNameSuiteSteps,
    // ScenarioScopedSuiteSteps,
    // RunHooksSteps,
    // GlobalHooks,
  ],
})
export class AppModule {}
