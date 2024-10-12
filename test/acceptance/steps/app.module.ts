import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { GreetingsSuiteSteps } from './step-definitions/greetings-suite.steps';
import { IsItFridayYetSuiteSteps } from './step-definitions/is-it-friday-yet.steps';

@Module({
  imports: [HttpModule],
  providers: [IsItFridayYetSuiteSteps, GreetingsSuiteSteps],
})
export class AppModule {}
