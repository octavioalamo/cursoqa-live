Feature: Administración

    Scenario: Un usuario administrador puede ver el listado de usuarios
        Given Un usuario administrador
        When Hace login
        Then Accede a la pagina "account"
        And Puede acceder al listado de usuarios


    Scenario: Scenario 2

    Scenario: Scenario 3