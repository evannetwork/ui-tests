Feature: evan.network login

Scenario: Logging in to evan.network using angular

  Given I log in to evan.network using angular
  Then I can see the angular dashboard


@tag:noLogout
Scenario: Logout from of evan.network using angular

  Given I log in to evan.network using angular with default
  When I log out from angular
  Then I am no longer logged in to angular


@CORE-461
Scenario: Logging in to evan.network using vue

  Given I log in to evan.network using vue
  Then I want to see a text including 'What would you like to start with?'


@tag:noLogout
@CORE-461
Scenario: Logout from of evan.network using vue

  Given I log in to evan.network using vue with default
  When I log out from vue
  Then I am no longer logged in to vue


@tag:noLogout
@CORE-461
Scenario: Entering a correct mnemonic

  Given I go to the evan.network startpage
  Then I want to see a text including 'Please select an account type.'
  When I click on link to "sign-in"
  Then I want to see a text including 'Recovery Key'
  When I set Input field with id "mnemonicInput0" to "define"
    And I set Input field with id "mnemonicInput1" to "sunset"
    And I set Input field with id "mnemonicInput2" to "extra"
    And I set Input field with id "mnemonicInput3" to "swear"
    And I set Input field with id "mnemonicInput4" to "runway"
    And I set Input field with id "mnemonicInput5" to "such"
    And I set Input field with id "mnemonicInput6" to "sleep"
    And I set Input field with id "mnemonicInput7" to "milk"
    And I set Input field with id "mnemonicInput8" to "alley"
    And I set Input field with id "mnemonicInput9" to "text"
    And I set Input field with id "mnemonicInput10" to "lemon"
    And I set Input field with id "mnemonicInput11" to "stadium"
    Then the button "Next" should be "enabled"


@tag:noLogout
@CORE-461
Scenario: Entering a mnemonic with a word, that is valid but does not belong to this mnemonic

  Given I go to the evan.network startpage
  Then I want to see a text including 'Please select an account type.'
  When I click on link to "sign-in"
  Then I want to see a text including 'Recovery Key'
  When I set Input field with id "mnemonicInput0" to "define"
    And I set Input field with id "mnemonicInput1" to "sunset"
    And I set Input field with id "mnemonicInput2" to "extra"
    And I set Input field with id "mnemonicInput3" to "swear"
    And I set Input field with id "mnemonicInput4" to "runway"
    And I set Input field with id "mnemonicInput5" to "such"
    And I set Input field with id "mnemonicInput6" to "sleep"
    And I set Input field with id "mnemonicInput7" to "milk"
    And I set Input field with id "mnemonicInput8" to "alley"
    And I set Input field with id "mnemonicInput9" to "text"
    And I set Input field with id "mnemonicInput10" to "lemon"
    And I set Input field with id "mnemonicInput11" to "goose"
    Then the button "Next" should be "disabled"
      And I want to see a text including "The composition of the words in your recovery key is incorrect. Please check your input."


@tag:noLogout
@CORE-461
Scenario: Entering a mnemonic with an invalid word

  Given I go to the evan.network startpage
  Then I want to see a text including 'Please select an account type.'
  When I click on link to "sign-in"
  Then I want to see a text including 'Recovery Key'
  When I set Input field with id "mnemonicInput0" to "define"
    And I set Input field with id "mnemonicInput1" to "sunset"
    And I set Input field with id "mnemonicInput2" to "extra"
    And I set Input field with id "mnemonicInput3" to "swear"
    And I set Input field with id "mnemonicInput4" to "runway"
    And I set Input field with id "mnemonicInput5" to "such"
    And I set Input field with id "mnemonicInput6" to "sleep"
    And I set Input field with id "mnemonicInput7" to "milk"
    And I set Input field with id "mnemonicInput8" to "alley"
    And I set Input field with id "mnemonicInput9" to "text"
    And I set Input field with id "mnemonicInput10" to "lemon"
    And I set Input field with id "mnemonicInput11" to "stadum"
    Then the button "Next" should be "disabled"
      And I want to see a text including "One or more of the given words is not allowed in recovery keys. Please check your input."


@CORE-461
Scenario: Logging in to evan.network using vue with a wrong password

  Given I go to the evan.network startpage
  Then I want to see a text including 'Please select an account type.'
  When I click on link to "sign-in"
  Then I want to see a text including 'Recovery Key'
  When I set Input field with id "mnemonicInput0" to "define"
    And I set Input field with id "mnemonicInput1" to "sunset"
    And I set Input field with id "mnemonicInput2" to "extra"
    And I set Input field with id "mnemonicInput3" to "swear"
    And I set Input field with id "mnemonicInput4" to "runway"
    And I set Input field with id "mnemonicInput5" to "such"
    And I set Input field with id "mnemonicInput6" to "sleep"
    And I set Input field with id "mnemonicInput7" to "milk"
    And I set Input field with id "mnemonicInput8" to "alley"
    And I set Input field with id "mnemonicInput9" to "text"
    And I set Input field with id "mnemonicInput10" to "lemon"
    And I set Input field with id "mnemonicInput11" to "stadium"
    Then the button "Next" should be "enabled"
  When I click on button "Next"
    And I wait for 3 seconds
    Then I want to see a text including "Password"
  When I set Input field with label "Password" to "Test12345"
    And I click on button "Unlock"
    Then I want to see a text including "The provided password is invalid."


@CORE-461
Scenario: Logging in to evan.network using vue with a right password

  Given I go to the evan.network startpage
  Then I want to see a text including 'Please select an account type.'
  When I click on link to "sign-in"
  Then I want to see a text including 'Recovery Key'
  When I set Input field with id "mnemonicInput0" to "define"
    And I set Input field with id "mnemonicInput1" to "sunset"
    And I set Input field with id "mnemonicInput2" to "extra"
    And I set Input field with id "mnemonicInput3" to "swear"
    And I set Input field with id "mnemonicInput4" to "runway"
    And I set Input field with id "mnemonicInput5" to "such"
    And I set Input field with id "mnemonicInput6" to "sleep"
    And I set Input field with id "mnemonicInput7" to "milk"
    And I set Input field with id "mnemonicInput8" to "alley"
    And I set Input field with id "mnemonicInput9" to "text"
    And I set Input field with id "mnemonicInput10" to "lemon"
    And I set Input field with id "mnemonicInput11" to "stadium"
    Then the button "Next" should be "enabled"
  When I click on button "Next"
    And I wait for 3 seconds
    Then I want to see a text including "Password"
  When I set Input field with label "Password" to "Test1234"
    And I click on button "Unlock"
    And I wait for 3 seconds
    Then I want to see a text including "Welcome to the evan.network"


@CORE-461
Scenario: Logging in to evan.network using vue with a not registered mnemnonic

  Given I go to the evan.network startpage
  Then I want to see a text including 'Please select an account type.'
  When I click on link to "sign-in"
  Then I want to see a text including 'Recovery Key'
  When I set Input field with id "mnemonicInput0" to "lesson"
    And I set Input field with id "mnemonicInput1" to "wing"
    And I set Input field with id "mnemonicInput2" to "miracle"
    And I set Input field with id "mnemonicInput3" to "asthma"
    And I set Input field with id "mnemonicInput4" to "trial"
    And I set Input field with id "mnemonicInput5" to "way"
    And I set Input field with id "mnemonicInput6" to "regret"
    And I set Input field with id "mnemonicInput7" to "gravity"
    And I set Input field with id "mnemonicInput8" to "original"
    And I set Input field with id "mnemonicInput9" to "manage"
    And I set Input field with id "mnemonicInput10" to "cup"
    And I set Input field with id "mnemonicInput11" to "sad"
    Then the button "Next" should be "enabled"
  When I click on button "Next"
    And I wait for 3 seconds
    Then I want to see a text including "There is no evan.network Identity associated with this recovery key."
