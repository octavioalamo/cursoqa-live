Feature: Registro de usuarios
    Background:
        * def endpointURL = '/registration'
        * def random_email = 
            """
                function(){
                    return Math.round(Math.random()*100000)+"@email.com"
                }
            """

    Scenario: Registro exitoso  
        Given url apiURL
        And path endpointURL
        And header Content-Type = 'application/json'
        And header Accept = 'application/json, text/plain, */*'
        * def email = random_email()
        And request '{"captcha":"","email":"' + email + '","firstName":"Octavio","lastName":"Alamo","password":"secreto","password2":"secreto"}'
        When method POST
        Then status 200
        And match response == "User successfully registered."