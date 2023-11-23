Feature: Obtener información de un perfume
    Background:
        * def endpointURL = '/perfumes/graphql/perfume'

    @current
    Scenario Outline: Se obtiene la información correctamente
        Given url apiURL
        And path endpointURL
        And header Content-Type = 'application/json'
        And header Accept = 'application/json, text/plain, */*'
        And request '{"query":"    {        perfume(id: '+id+') {            id            perfumeTitle            perfumer            year            country            perfumeGender            fragranceTopNotes            fragranceMiddleNotes            fragranceBaseNotes            filename            price            volume            type            perfumeRating            reviews {                id                author                message                date                rating            }        }    }"}'
        When  method POST
        Then status 200
        And match response.data.perfume.id == karate.fromString(id)
        And match response.data.perfume.perfumeTitle ==  title
        And match response.data.perfume.perfumer == perfumer

        Examples:
            | id | title                | perfumer          |
            | 1  | Boss Bottled Night   | Hugo Boss         |
            | 26 | Bad Boy              | Carolina Herrera  |
            | 58 | Gentleman 2017       | Givenchy          |
