class cartPage{
    elements = {
        checkoutButton: () => cy.get('button.btn-success')
    }

    checkOut(){
        this.elements.checkoutButton().click()
    }
}

module.exports = new cartPage()