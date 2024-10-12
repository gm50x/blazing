import { HttpService } from '@nestjs/axios';
import { strict as assert } from 'assert';
import { Given, Suite, Then, When } from '../../lib';

@Suite()
export class GetHelloNameSuiteSteps {
  private name: string;
  private actualAnswer: string;

  constructor(private readonly http: HttpService) {}

  @Given('I am a known user {string}')
  setName(name: string) {
    this.name = name;
  }

  @When('I hit GET hello name')
  async getHelloName() {
    const res = await this.http.axiosRef.get(
      `http://localhost:3000/hello/${this.name}`,
    );
    this.actualAnswer = res.data;
  }

  @Given('I am an unknown user')
  setUnknownUser() {
    this.name = null;
  }

  @When('I hit GET hello')
  async getHello() {
    const res = await this.http.axiosRef.get(`http://localhost:3000/hello`);
    this.actualAnswer = res.data;
  }

  @Then('it should return {string}')
  verify(expected: string) {
    assert.equal(this.actualAnswer, expected);
  }
}
