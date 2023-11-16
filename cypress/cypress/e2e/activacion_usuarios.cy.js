const { faker } = require('@faker-js/faker');
const loginPage = require('../pages/loginPage')

describe('Activación de usuarios', () => {
    it('Debe decir que la cuenta se ha activado si el codigo de activación es correcto', () =>{
        const email = faker.internet.email()
        const password = faker.internet.password()
        //Post al API para crear la cuenta
        cy.request('POST', 'http://localhost:8080/api/v1/registration', {
            captcha: "",
            email: email,
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            password: password,
            password2: password
        }).then((response) => {
            expect(response.status).to.eq(200)

             //Sacar el codigo de activación de la base de datos

             cy.task('connectDB', `select activation_code from users where email='${email}'`).then( rows => {
                const activationCode = rows[0].activation_code
                cy.log('Activation code is ' + activationCode)
                //Formar la URL
                const activationURL = '/activate/' + activationCode
                //Navegar a la URL
                cy.visit(activationURL)
                //Comprobar el alert
                loginPage.elements.confirmationAlert().should('be.visible').then((alert) => {
                    expect(alert).to.have.text('User successfully activated.')
                })
             })
        
        })   
    })
})