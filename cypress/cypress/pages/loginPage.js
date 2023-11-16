class loginPage{
    elements = {
        confirmationAlert: () => cy.get('div.alert-success'),
        email: () => cy.get('input[name="email"]'),
        password: () => cy.get('input[name="password"]'),
        submitButton: () => cy.get('button[type="submit"]')
    }

    login(email,password){
        this.elements.email().type(email)
        this.elements.password().type(password)
        this.elements.submitButton().click()
    }
}

module.exports = new loginPage()