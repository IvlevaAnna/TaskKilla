import data from "../fixtures/data"

const serverUrl = Cypress.env('serverUrl');

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

    it('priority filter', () => {

        cy.intercept('GET', `${serverUrl}/api/main_page/`, {
            statusCode: 201,
            body: data
        })


        cy.visit('board')
        cy.get('[data-test-id="board-columns"]').should('be.visible')
        cy.get('[data-test-id="card-item"]').its('length').should('eq', 8);
        cy.get('[data-test-id="priority"]').click()

        cy.get('[data-test-id="card-item"]').eq(0).children().eq(0).children().eq(0).should('have.id', 'lowPriority')
        cy.get('[data-test-id="card-item"]').eq(1).children().eq(0).children().eq(0).should('have.id', 'mediumPriority')
        cy.get('[data-test-id="card-item"]').eq(2).children().eq(0).children().eq(0).should('have.id', 'highPriority')

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
        cy.contains('Task1').should('be.visible')
        cy.contains('Task2').should('not.exist')
        cy.contains('Task6').should('not.exist')
        cy.contains('Task9').should('not.exist')
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
        cy.contains('Task1').should('be.visible')
    })

    it('sign out', () => {
        cy.intercept('GET', `${serverUrl}/api/main_page/`, {
            statusCode: 201,
            body: data,
        })

        cy.visit('board')
        cy.get('[data-test-id="board-columns"]').should('be.visible')
        cy.contains('Logout').should('be.visible').click()
        cy.get('[data-test-id="sign-in"]').should('be.visible')
    })

    it('date filter', () => {

        cy.intercept('GET', `${serverUrl}/api/main_page/`, {
            statusCode: 201,
            body: data
        })


        cy.visit('board')
        cy.get('[data-test-id="board-columns"]').should('be.visible')
        cy.get('[data-test-id="card-item"]').its('length').should('eq', 9);

        cy.get('[data-test-id="date-filter"]').type('2022-04-12')

        cy.get('[data-test-id="card-item"]').its('length').should('eq', 4);

    })

    it('renders map', async () => {
        cy.intercept('GET', `${serverUrl}/api/main_page/`, {
            statusCode: 201,
            body: data,
        })

        cy.visit('board')
        cy.get('[data-test-id="board-columns"]').should('be.visible')
        cy.get('[data-test-id="todo-button"]').click()
        cy.get('[data-test-id="user-lock"]').should('be.visible')
        cy.get('[data-test-id="show-map-button"]').click()
        cy.get('[data-test-id="map-global"]').then(() => {
            cy.get('[data-test-id="accept-map-button"]').click().then(() => {
                cy.get('[data-test-id="user-lock"]').should('be.visible')
            })

        }
        )
    })

    it('user name', () => {
        cy.intercept('GET', `${serverUrl}/api/main_page/`, {
            statusCode: 201,
            body: data
        })
        cy.visit('board')
        cy.get("[data-test-id='user-name']").should('have.text', 'testUser')
    })

    it('can not add invalid item', () => {
        cy.intercept('GET', `${serverUrl}/api/main_page/`, {
            statusCode: 201,
            body: data
        })


        cy.visit('board')
        cy.get('[data-test-id="todo-button"]').should('be.visible')
        cy.get('[data-test-id="board-columns"]').should('be.visible')
        cy.get('[data-test-id="card-item"]').its('length').should('eq', 9);
        cy.get('[data-test-id="todo-button"]').click()
        cy.get('[data-test-id="form-submit"]').click()
        cy.get('[data-test-id="card-item"]').its('length').should('eq', 9);
    })

})
