Feature: Greetings
  Everybody gets their own greeting

  Scenario Outline: Trigger hello with name
    Given a named user "<name>"
    When I hit GET Hello name
    Then it should return "<answer>"

  Examples:
    | name   | answer       |
    | Jack   | Hello Jack!  |
    | Jane   | Hello Jane!  |
    | June   | Hello June!  |
    