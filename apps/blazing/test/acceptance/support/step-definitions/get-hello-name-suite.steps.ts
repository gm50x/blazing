import { HttpService } from '@nestjs/axios';
import { strict as assert } from 'assert';
import { Given, Suite, Then, When } from '../../lib';

@Suite()
export class GetHelloNameSuiteSteps {
  private result: string;
  private name: string;

  constructor(private readonly http: HttpService) {}

  @Given('user is named {word}')
  setName(name: string) {
    this.name = name;
  }

  @When('we invoke GET hello name Endpoint')
  async invokeGetHelloName() {
    const response = await this.http.axiosRef.get(
      `http://localhost:3000/hello/${this.name}`,
    );
    this.result = response.data;
  }

  @Then('it should reply with {word}')
  verify(reply: string) {
    console.log({ reply }, '-----------');
    assert.equal(this.result, reply);
  }
}
