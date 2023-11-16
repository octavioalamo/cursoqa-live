const homePage = require('../pages/homePage')
const registerPage = require('../pages/registerPage')
const { faker } = require('@faker-js/faker');


function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

describe('Registro de usuarios', () => {

  beforeEach(() => {
    cy.visit('/')
    homePage.gotoSignUp()
    cy.url().should('contain', '/registration')
  })

  it('Debe mostrar una alerta diciendo que se ha enviado un link para activar la cuenta si todos los parámetros son correctos', () => {
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
      expect(el).to.be.visible
    })
  })

  it('Si envio el formulario sin rellenar ningún campo, se muestran todos los errores de validación', () => {
    cy.intercept('POST', Cypress.env('BACKEND_URL') + '/api/v1/registration').as('registrationRequest')
    registerPage.sendForm()

    cy.wait('@registrationRequest').then(({request, response}) => {
        ['email', 'firstName','lastName','password','password2'].forEach((field) => {
          registerPage.elements.validationError(field).should('be.visible').then( el => {
            expect(el).to.have.text(response.body[field + 'Error'])
          })
        })
    })
  })

  it('Debe mostrar un error cuando el email esté duplicado', () =>{
    cy.intercept('POST', Cypress.env('BACKEND_URL') + '/api/v1/registration', {
      statusCode: 400,
      body: '{"cause":null,"emailError":"Email is already used.","localizedMessage":null,"message":null,"stackTrace":[],"suppressed":[]}'
    })

    const password = faker.internet.password()
    registerPage.fillForm(
      faker.internet.email(),
      faker.person.firstName(),
      faker.person.lastName(),
      password,
      password
    )

    registerPage.sendForm()

    registerPage.elements.validationError('email').should('be.visible').then(el => {
      expect(el).to.have.text("Email is already used.")
    })
  })

  it('Debe de dar un error si el nombre tiene mas de 255 carácteres', () => {
    cy.intercept('POST', Cypress.env('BACKEND_URL') + '/api/v1/registration', (req) => {
      req.body.firstName = makeid(260)
    })

    const password = faker.internet.password()
    registerPage.fillForm(
      faker.internet.email(),
      faker.person.firstName(),
      faker.person.lastName(),
      password,
      password
    )

    registerPage.sendForm()

    registerPage.elements.validationError('firstName').then(el => {
      expect(el).to.be.visible
    })
  })
})