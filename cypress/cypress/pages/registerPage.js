class registerPage{
    elements ={
        form: () => cy.get('form'),
        emailInput: () => this.elements.form().find('input').eq(0),
        firstName: () => this.elements.form().find('input').eq(1),
        lastName: () => this.elements.form().find('input').eq(2),
        password1: () => this.elements.form().find('input').eq(3),
        password2: () => this.elements.form().find('input').eq(4),
        submitButton: () => cy.get('button'),
        confirmationAlert: () => cy.get('div.alert-success')
    }

    fillForm(email,firstName,lastName,password1,password2){
        this.elements.emailInput().type(email)
        this.elements.firstName().type(firstName)
        this.elements.lastName().type(lastName)
        this.elements.password1().type(password1)
        this.elements.password2().type(password2)
    }

    sendForm(){
        this.elements.submitButton().click()
    }
}

module.exports = new registerPage();