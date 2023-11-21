const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const homePage = require('../pages/homePage')
const catalogPage = require('../pages/catalogPage')
const productPage = require('../pages/productPage')
const cartPage = require('../pages/cartPage')

Given('Un usuario anónimo', () => {
    cy.visit('/')
})

When('Accede al catálogo de perfumes', () => {
    homePage.gotoPerfumes()
})

When('Selecciona el perfume {string}', (perfume) => {
    catalogPage.selectPerfumeByName(perfume)
})

When('Pulsa el botón Add to cart', () => {
    productPage.addToCart()
})

When('Pulsa el botón Checkout', () => {
    cartPage.checkOut()
})

Then('Se le muestra la página para introducir la dirección de envío', () => {
    cy.url().should('contain', '/order')
})