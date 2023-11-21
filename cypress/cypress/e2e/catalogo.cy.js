
const combinaciones = require('../fixtures/catalogo.json')
const catalogPage = require('../pages/catalogPage')
const homePage = require('../pages/homePage')

describe('Catalogo de perfumes', () => {
    
    beforeEach(() => {
        cy.visit('/')
        homePage.gotoPerfumes()
        cy.url().should('contain', '/menu')
    })

    combinaciones.forEach(combinacion => {
        const brand = Object.keys(combinacion.filters.brand).filter( key => combinacion.filters.brand[key])
        const genders = Object.keys(combinacion.filters.gender).filter(key => combinacion.filters.gender[key])
        const prices = Object.keys(combinacion.filters.price).filter(key =>  combinacion.filters.price[key])

        const tcTitle = `Debe haber ${combinacion.result.count} elementos con los filtros Brand [${brand}], Gender [${genders}], Price [${prices}]]`

        it(tcTitle, () => {
            Object.keys(combinacion.filters.brand).forEach(key => {
                if (combinacion.filters.brand[key]){
                    catalogPage.clickBrandFilter(key)
                }
            })

            Object.keys(combinacion.filters.gender).forEach(key => {
                if (combinacion.filters.gender[key]){
                    catalogPage.clickGenderFilter(key)
                }
            })

            Object.keys(combinacion.filters.price).forEach(key => {
                if (combinacion.filters.price[key]){
                    catalogPage.clickPriceFilter(key)
                }
            })

            catalogPage.elements.searchItems().should('have.length', combinacion.result.count)
        })
    })

    
})