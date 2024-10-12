import { strict as assert } from 'assert';
import { Given, Suite, Then, When } from '../../lib';

function isItFriday(today: string) {
  if (today === 'Friday') {
    return 'TGIF';
  }
  return 'Nope';
}

@Suite()
export class IsItFridayYetSuiteSteps {
  private today: string;
  private actualAnswer: string;

  @Given('today is {string}')
  setToday(today: string) {
    this.today = today;
  }

  @When("I ask whether it's Friday yet")
  isItFriday() {
    this.actualAnswer = isItFriday(this.today);
  }

  @Then('I should be told {string}')
  verify(expected: string) {
    assert.equal(this.actualAnswer, expected);
  }
}
