class catalogPage {
    elements = {
        brandFilter: () => cy.get('#homeSubmenu > ul:nth-child(1)'),
        brandFilterElement: (brand) => this.elements.brandFilter().find('i#' + brand).eq(0),
        genderFilter: () => cy.get('li.active:nth-child(4) > ul:nth-child(1)'),
        genderFilterElement: (gender) => this.elements.genderFilter().find('i#' + gender).eq(0),
        priceFilter: () => cy.get('li.active:nth-child(6) > ul:nth-child(1)'),
        priceFilterElement: (price) => {
            switch(price) {
                case 'any': return this.elements.priceFilter().find('i#any').eq(0)
                default:
                    const pair = price.split('-')
                    const id = `${pair[0]} - ${pair[1]} €`
                    return this.elements.priceFilter().find(`i[id="${id}"]`).eq(0)
            }
        },
        searchItems: () => cy.get('div.row:nth-child(2)').find('div.card'),
        showMoreButtonByName: (name) => cy.get(`span[id="${name}"]`).parent()
    }

    clickBrandFilter(brand){
        const element = this.elements.brandFilterElement(brand)
        element.scrollIntoView()
        element.click()
    }

    clickGenderFilter(gender){
        const element = this.elements.genderFilterElement(gender)
        element.scrollIntoView()
        element.click()
    }

    clickPriceFilter(price){
        const element = this.elements.priceFilterElement(price)
        element.scrollIntoView()
        element.click()
    }

    selectPerfumeByName(perfume){
        const element = this.elements.showMoreButtonByName(perfume)
        element.scrollIntoView()
        element.click()
    }
}

module.exports = new catalogPage()