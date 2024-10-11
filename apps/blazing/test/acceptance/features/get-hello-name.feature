Feature: Get Personalized Hello

  Scenario Outline: Every person receives their own greeting
    Given user is named <name> 
    When we invoke GET hello name Endpoint
    Then it should reply with Hello <name>!

  Examples:
      | name    |
      | Jack    |
      | Hector  |
      | Oliver  |
      