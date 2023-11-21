class productPage{
    elements = {
        addToCartButton: () => cy.get('button.btn-success')
    }

    addToCart(){
        this.elements.addToCartButton().click()
    }
}

module.exports = new productPage()