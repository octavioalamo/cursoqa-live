```gherkin
Feature: Busqueda
    Background:
        * def endpointURL = '/perfumes/search'
        * def nullAsEmpty = function(x) {if (!x) return ''; else return x;}
    @current
    Scenario Outline: Búsqueda correcta
        Given url apiURL
        And path endpointURL
        And header Content-Type = 'application/json'
        And header Accept = 'application/json, text/plain, */*'
        * def cleanPerfumers = nullAsEmpty(perfumers)
        * def cleanGenders = nullAsEmpty(genders)
        * def cleanPrices = nullAsEmpty(prices)
        And request '{"perfumers":['+cleanPerfumers+'],"genders":['+cleanGenders+'],"prices":['+cleanPrices+']}'
        When method POST
        Then status 200
        And assert response.length == karate.fromString(count)

        Examples:
            | perfumers     | genders   | prices    | count     |
            | "Dior"        |           |           | 6         |
            | "Dior","Creed"|           |           | 13        |
            |               | "male"    | 90,250    | 21        |