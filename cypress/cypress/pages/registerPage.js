class registerPage{
    elements ={
        form: () => cy.get('form'),
        email: () => this.elements.form().find('input').eq(0),
        firstName: () => this.elements.form().find('input').eq(1),
        lastName: () => this.elements.form().find('input').eq(2),
        password: () => this.elements.form().find('input').eq(3),
        password2: () => this.elements.form().find('input').eq(4),
        submitButton: () => cy.get('button'),
        confirmationAlert: () => cy.get('div.alert-success'),
        validationError: function(field){
            switch (field){
                case 'email': return cy.get('div.form-group:nth-child(1) > div:nth-child(3) > div:nth-child(2)')
                case 'firstName': return cy.get('div.form-group:nth-child(2) > div:nth-child(3) > div:nth-child(2)')
                case 'lastName': return cy.get('div.form-group:nth-child(3) > div:nth-child(3) > div:nth-child(2)')
                case 'password': return cy.get('div.form-group:nth-child(4) > div:nth-child(3) > div:nth-child(2)')
                case 'password2': return cy.get('div.form-group:nth-child(5) > div:nth-child(3) > div:nth-child(2)')
            }
        }
    }

    fillForm(email,firstName,lastName,password1,password2){
        this.elements.email().type(email)
        this.elements.firstName().type(firstName)
        this.elements.lastName().type(lastName)
        this.elements.password().type(password1)
        this.elements.password2().type(password2)
    }

    sendForm(){
        this.elements.submitButton().click()
    }
}

module.exports = new registerPage();