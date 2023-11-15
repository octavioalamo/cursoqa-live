class homePage{
    elements ={
        signUpLink: () => cy.get('#sign_up')
    }

    gotoSignUp(){
        this.elements.signUpLink().click()
    }
}

module.exports = new homePage();