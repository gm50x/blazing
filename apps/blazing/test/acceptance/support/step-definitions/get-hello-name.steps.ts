import { HttpService } from '@nestjs/axios';
import { strict as assert } from 'assert';
import { Given, Suite, Then, When } from '../../lib';

@Suite()
export class GetHelloSuiteSteps {
  private name: string;
  private actualAnswer: string;

  constructor(private readonly http: HttpService) {}

  @Given('a named user {string}')
  setToday(name: string) {
    this.name = name;
  }

  @When('I hit GET Hello name')
  async getHelloName() {
    const res = await this.http.axiosRef.get(
      `http://localhost:3000/hello/${this.name}`,
    );
    this.actualAnswer = res.data;
  }

  @Then('it should return {string}')
  verify(expected: string) {
    assert.equal(this.actualAnswer, expected);
  }
}
