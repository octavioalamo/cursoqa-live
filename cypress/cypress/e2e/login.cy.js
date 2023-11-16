const loginPage = require('../pages/loginPage')
const homePage = require('../pages/homePage')
const { faker } = require('@faker-js/faker');

describe('Login', () => {
    it('Funciona correctamente con una cuenta activa', () => {
        cy.visit('/')
        homePage.gotoSignIn()
        cy.url().should('contain', '/login')

        const email = faker.internet.email()
        const password = faker.internet.password()

        cy.createAccount(email, faker.person.firstName(), faker.person.lastName(), password).then( () => {
            cy.activateAccount(email).then(() => {
                loginPage.login(email, password)
                cy.url().should('contain', '/account')
            })
        })
    })

})