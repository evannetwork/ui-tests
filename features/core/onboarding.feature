Feature: evan.network onboarding

Scenario: Registering a new account on evan Happy Path

  Given I go to the evan.network startpage
  Then I want to see a text including "Please select an account type."
    And I set Input field with label "Account name" to "Automated Test Account"
    And I set Input field with label "Password" to "Test1234"
    And I set Input field with label "Retype password" to "Test1234"
  Then the button "Continue" should be "enabled"
  When I click on button "Continue"
    And I click the element with id "termsAccepted"
    And I click the element with id "evan-recaptcha"
    And I wait for 3 seconds
    Then the button "Create Account" should be "enabled"
  When I click on button "Create Account"
    Then I want to see a text including "Creating identity contract..."
    And I want to see a text including "Encrypting user information..."
    And I want to see a text including "Creating mailbox, address book, ..."
    And I want to see a element with class "checkmark"
    And I want to see a text including "Recovery Key"
  When I click on button "View Profile"
    Then I want to see a text including "What would you like to start with?"

Scenario: Registering a new account not set account name

  Given I go to the evan.network startpage
  Then I want to see a text including "Please select an account type."
    And I set Input field with label "Password" to "Test1234"
    And I set Input field with label "Retype password" to "Test1234"
  Then I want to see a text including "Please enter a user name!"
    And the button "Continue" should be "disabled"

Scenario: Registering a new account and test password checks

  Given I go to the evan.network startpage
  Then I want to see a text including "Please select an account type."
    And I set Input field with label "Account name" to "Automated Test Account"
    And I set Input field with label "Password" to "Test"
  Then I want to see a text including "Your password must be at least 8 characters long!"
    And the button "Continue" should be "disabled"
  Then I set Input field with label "Password" to "Test1234"
    And I set Input field with label "Retype password" to "Test1235"
  Then I want to see a text including "Your password must match the previous one!"
    And the button "Continue" should be "disabled"

Scenario: Registering a new account on evan and not check terms

  Given I go to the evan.network startpage
  Then I want to see a text including "Please select an account type."
  And I set Input field with label "Account name" to "Automated Test Account"
  And I set Input field with label "Password" to "Test1234"
  And I set Input field with label "Retype password" to "Test1234"
  Then the button "Continue" should be "enabled"
  Then I click on button "Continue"
  Then I click the element with id "evan-recaptcha"
  Then the button "Create Account" should be "disabled"

Scenario: Registering a new account on evan and not check recaptcha

  Given I go to the evan.network startpage
  Then I want to see a text including "Please select an account type."
  And I set Input field with label "Account name" to "Automated Test Account"
  And I set Input field with label "Password" to "Test1234"
  And I set Input field with label "Retype password" to "Test1234"
  Then the button "Continue" should be "enabled"
  Then I click on button "Continue"
  Then I click the element with id "termsAccepted"
  Then the button "Create Account" should be "disabled"
