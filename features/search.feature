Feature: Book place
    Scenario: Should book one place
        Given user is on page
        When user choose day
        When user choose movie
        When user choose place
        When user press to book button
        Then user sees label button "Получить код бронирования"
    Scenario: Should book two places
        Given user is on page
        When user choose day
        When user choose movie
        When user choose place
        When user choose another place
        When user press to book button
        Then user sees label button "Получить код бронирования"
        Then user sees text "1/5, 4/8"
    Scenario: Must not book a place
        Given user is on page
        When user choose day
        When user choose movie
        When user choose occupied place
        When user press to book button
        Then user sees button is disabled
        