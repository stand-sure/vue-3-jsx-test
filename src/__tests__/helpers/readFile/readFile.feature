Feature: Reading a file

Scenario: Request existing text file
    Given The file exists and is text
    When I request it
    Then I should get back the text contents

Scenario: Request non-existent file
    Given The file does not exist
    When I request it
    Then I should not get back anything