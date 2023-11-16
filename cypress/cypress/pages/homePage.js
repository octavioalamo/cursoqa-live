class homePage{
    elements ={
        signUpLink: () => cy.get('#sign_up'),
        signInLink: () => cy.get('#sign_in')
    }

    gotoSignUp(){
        this.elements.signUpLink().click()
    }

    gotoSignIn(){
        this.elements.signInLink().click()
    }
}

module.exports = new homePage();