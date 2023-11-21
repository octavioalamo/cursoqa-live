class homePage{
    elements ={
        signUpLink: () => cy.get('#sign_up'),
        signInLink: () => cy.get('#sign_in'),
        perfumesLink: () => cy.get('#perfumes')
    }

    gotoSignUp(){
        this.elements.signUpLink().click()
    }

    gotoSignIn(){
        this.elements.signInLink().click()
    }

    gotoPerfumes(){
        this.elements.perfumesLink().click()
    }
}

module.exports = new homePage();