Feature: Showing a topic

    Scenario: No Topic
        Given No topic
        When Element created
        Then topic should be undefined
        And it should render text "Please select a topic"

    Scenario: No Topic (reactive)
        Given No topic (reactive)
        When Element created
        Then topic should be undefined
        And it should render text "Please select a topic"

    Scenario: Topic name and id should be used
        Given A topic
        When Element created
        Then the topic name should used
        And the id should be used