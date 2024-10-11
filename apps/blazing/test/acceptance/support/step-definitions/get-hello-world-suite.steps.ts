import { HttpService } from '@nestjs/axios';
import { strict as assert } from 'assert';
import { Given, Suite, Then, When } from '../../lib';

@Suite()
export class GetHelloWorldSuiteSteps {
  private result: string;

  constructor(private readonly http: HttpService) {}

  @Given('application is running')
  noOp() {
    //do nothing
  }

  @When('we invoke GET Hello Endpoint')
  async invokeGetRoot() {
    const response = await this.http.axiosRef.get(
      'http://localhost:3000/hello',
    );
    this.result = response.data;
  }

  @Then('it should say "Hello World!"')
  verify() {
    assert.equal(this.result, 'Hello World!');
  }
}
