const homePage = require('../pages/homePage')
const registerPage = require('../pages/registerPage')
const { faker } = require('@faker-js/faker');

describe('Registro de usuarios', () => {
  it('Debe mostrar una alerta diciendo que se ha enviado un link para activar la cuenta si todos los parámetros son correctos', () => {
    cy.visit('/')
    homePage.gotoSignUp()

    cy.url().should('contain', '/registration')

    const password = faker.internet.password()
    registerPage.fillForm(
      faker.internet.email(),
      faker.person.firstName(),
      faker.person.lastName(),
      password,
      password
    )

    registerPage.sendForm()

    registerPage.elements.confirmationAlert().then(el => {
      expect(el).to.exist
      expect(el).to.be.visible
    })
  })
})