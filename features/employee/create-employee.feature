Feature: Create Employee
  As a user
  I want to create a new employee
  So that the employee can be added to the system

  Scenario: Successfully create a new employee
    Given I have a valid employee data
    When I send a POST request to "/employee" with the employee data
    Then I should receive a 201 status code and the employee ID
