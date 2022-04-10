describe("Error", () => {
    it('Should render error page', () => {
        cy.visit('/123')
        cy.get('[data-test-id="error-page"]').should('be.visible')
    })

    it('Should not render signin page', () => {
        cy.visit('/123')
        cy.get('[data-test-id="sign-in"]').should('not.exist')
    })
})
