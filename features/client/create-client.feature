Feature: Create Client
  As a user
  I want to create a new client
  So that the client can be added to the system

  Scenario: Successfully create a new client
    Given I have a valid client data
    When I send a POST request to "/client" with the client data
    Then I should receive a 201 status code and the client ID

