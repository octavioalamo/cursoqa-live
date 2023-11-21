class accountPage{
    elements = {
        listAllUsersLink: () => cy.get('a[href="/account/admin/users"]')
    }
}

module.exports = new accountPage()