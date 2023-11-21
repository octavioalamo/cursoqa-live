const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const homePage = require('../pages/homePage')
const loginPage = require('../pages/loginPage')
const accountPage = require('../pages/accountPage')

Given("Un usuario administrador", () => {
    localStorage.setItem('CYPRESS_LOGIN_ACCOUNT', 'admin@gmail.com')
    localStorage.setItem('CYPRESS_LOGIN_PASSWORD', 'admin')
})

When("Hace login", () => {
    const user = localStorage.getItem('CYPRESS_LOGIN_ACCOUNT')
    const password = localStorage.getItem('CYPRESS_LOGIN_PASSWORD')

    cy.visit('/')
    homePage.gotoSignIn()
    loginPage.login(user, password)
})

Then("Accede a la pagina {string}", (pagina) => {
    switch(pagina){
        case 'account': cy.url().should('contain', '/account')
    }
})

Then("Puede acceder al listado de usuarios", () => {
    accountPage.elements.listAllUsersLink().then(el => {
        expect(el).to.be.visible
    })
})