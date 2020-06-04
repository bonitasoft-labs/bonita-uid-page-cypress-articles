Feature: Specification file

  Scenario: Creation button is disabled when information is not complete
    Given The server is started
    When I visit the index page
    And All inputs are filled
    Then The create button is "enabled"
    When Input "1" is cleared
    Then The create button is "disabled"
    When The "username" input is filled
    Then The create button is "enabled"
    When Input "2" is cleared
    Then The create button is "disabled"
    When The "password" input is filled
    Then The create button is "enabled"
    When Input "3" is cleared
    Then The create button is "disabled"
    When The "confirm password" input is filled
    Then The create button is "enabled"
    When Input "4" is cleared
    Then The create button is "disabled"
    When The "firstname" input is filled
    Then The create button is "enabled"
    When Input "5" is cleared
    Then The create button is "disabled"
    When The "lastname" input is filled
    Then The create button is "enabled"

  Scenario: User creation fails because password is not the same
    Given The server is started
    And API call response for "user creation should not be called" is mocked
    When I visit the index page
    And All inputs are filled
    And I modify the password field
    And I try to create the user
    Then I see the message about "Passwords don't match."

  Scenario: User creation fails because there is an authorization error
    Given The server is started
    And API call response for "401 response" is mocked
    When I visit the index page
    And All inputs are filled
    And I try to create the user
    Then I see the message about "Access denied."
    Then I see the message about "The user has not been created."

  Scenario: User creation fails because the user already exists
    Given The server is started
    And API call response for "403 response" is mocked
    When I visit the index page
    And All inputs are filled
    And I try to create the user
    Then I see the message about "The user already exists."
    Then I see the message about "The user has not been created."

  Scenario: User creation fails because the server has an error
    Given The server is started
    And API call response for "500 response" is mocked
    When I visit the index page
    And All inputs are filled
    And I try to create the user
    Then I see the message about "An error has occurred."
    Then I see the message about "The user has not been created."

  Scenario: User creation was successful
    Given The server is started
    And API call response for "user created" is mocked
    When I visit the index page
    And All inputs are filled
    And I try to create the user
    Then I see the message about "User successfully created."

  Scenario: User creation displays a loader while the user is being created
    Given The server is started
    And API call response for "user created after delay" is mocked
    When I visit the index page
    And All inputs are filled
    And I try to create the user
    Then The loader is shown
    When I wait for 5000 delay
    Then I see the message about "User successfully created."
    And The loader is not shown

  Scenario: User creation message disappears after 3 seconds
    Given The server is started
    And API call response for "user created" is mocked
    When I visit the index page
    And All inputs are filled
    And I try to create the user
    Then I see the message about "User successfully created."
    When I wait for 3000 delay
    And I modify the password field
    Then I don't see the message about "User successfully created."
