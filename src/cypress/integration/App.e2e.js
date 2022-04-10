describe("App", () => {
    it('Should have login button', () => {
        cy.visit('/')
        cy.get('button').should('have.text', 'Login')
    })
})
