const serverUrl = Cypress.env('serverUrl');

import data from "../fixtures/data"

describe("Board", () => {
    beforeEach(() => {
        cy.setLocalStorage('isLogin', 'true')
        cy.setLocalStorage('loginData', '{"profileObj":{"name":"testUser"}}')
    });

    it('all cards', () => {
        cy.intercept('GET', `${serverUrl}/api/main_page/`, {
            statusCode: 201,
            body: data,
        })

        cy.visit('board')
        cy.get('[data-test-id="board-columns"]').should('be.visible')
        cy.get('[data-test-id="card-item"]').its('length').should('eq', 8);
    })

    it('add item', () => {
        data.push({
            id: "9",
            title: "title9",
            description: "99999",
            status: 'ToDo'
        })

        cy.intercept('GET', `${serverUrl}/api/main_page/`, {
            statusCode: 201,
            body: data
        })


        cy.visit('board')
        cy.get('[data-test-id="todo-button"]').should('be.visible')
        cy.get('[data-test-id="board-columns"]').should('be.visible')
        cy.get('[data-test-id="todo-button"]').click()
        cy.get('[data-test-id=cardname-input]').type('title9')
        cy.get('[data-test-id=carddiscription-input]').type('99999')
        cy.get('[data-test-id="form-submit"]').click()
        cy.contains('title9').should('be.visible')
    })

    it('search by title', () => {
        cy.intercept('GET', `${serverUrl}/api/main_page/`, {
            statusCode: 201,
            body: data,
        })

        cy.visit('board')
        cy.get('[data-test-id="board-columns"]').should('be.visible')
        cy.get('[data-test-id="card-item"]').its('length').should('eq', 9);
        cy.get('[data-test-id="search"]').type("Task1")
        cy.get('[data-test-id="card-item"]').its('length').should('eq', 1);


    })

    it('search by description', () => {
        cy.intercept('GET', `${serverUrl}/api/main_page/`, {
            statusCode: 201,
            body: data,
        })

        cy.visit('board')
        cy.get('[data-test-id="board-columns"]').should('be.visible')
        cy.get('[data-test-id="card-item"]').its('length').should('eq', 9);
        cy.get('[data-test-id="search"]').type("description1")
        cy.get('[data-test-id="card-item"]').its('length').should('eq', 1);
    })

})