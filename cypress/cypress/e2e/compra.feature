Feature: Compra

Scenario: Compra de usuario anónimo
    Given Un usuario anónimo
    When Accede al catálogo de perfumes
    And Selecciona el perfume "Hugo Man"
    And Pulsa el botón Add to cart
    And Pulsa el botón Checkout
    Then Se le muestra la página para introducir la dirección de envío