Cypress.Commands.add('createAccount', (email, firstName, lastName, password) => {
    return cy.request('POST', 'http://localhost:8080/api/v1/registration', {
        captcha: "",
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: password,
        password2: password
    })
})

Cypress.Commands.add('activateAccount', (email) => {
    return cy.task("connectDB",`update users set active=true,activation_code=null where email='${email}'`)
})