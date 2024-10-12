Feature: Greetings
  Everybody gets their own greeting

  Scenario Outline: Trigger hello with name
    Given I am a known user "<name>"
    When I hit GET hello name
    Then it should return "<answer>"

  Examples:
    | name   | answer       |
    | Jack   | Hello Jack!  |
    | Jane   | Hello Jane!  |
    | June   | Hello June!  |
    
  Scenario: Trigger hello without name
    Given I am an unknown user
    When I hit GET hello
    Then it should return "Hello World!"