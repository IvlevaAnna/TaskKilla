import data from "../fixtures/data"

const serverUrl = Cypress.env('serverUrl');

describe("Board", () => {
    beforeEach(() => {
        cy.setLocalStorage('isLogin', 'true')
        cy.setLocalStorage('loginData', '{"profileObj":{"name":"testUser"}}')
    });

    it('all cards with back', () => {
        cy.request('http://cs33699-django-n2mwk.tw1.ru/api/main_page/').then(res => res.json)
            .then(res => {
                const length = res.body.length
                cy.visit('board')
                cy.get('[data-test-id="board-columns"]').should('be.visible')
                cy.get('[data-test-id="card-item"]').its('length').should('eq', length);
            })
    })

    it('priority filter back', () => {

        cy.request('http://cs33699-django-n2mwk.tw1.ru/api/main_page/').then(res => res.json)
            .then(res => {
                const length = res.body.length
                cy.visit('board')
                cy.get('[data-test-id="board-columns"]').should('be.visible')
                cy.get('[data-test-id="card-item"]').its('length').should('eq', length);
                cy.get('[data-test-id="priority"]').click()
                // cy.get('[data-test-id="card-item"]').eq(0).children().eq(0).children().eq(0).should('have.id', 'lowPriority')
                // cy.get('[data-test-id="card-item"]').eq(1).children().eq(0).children().eq(0).should('have.id', 'mediumPriority')
                // cy.get('[data-test-id="card-item"]').eq(2).children().eq(0).children().eq(0).should('have.id', 'highPriority')
            })

    })

    it('add item back', () => {
        cy.visit('board')
        cy.get('[data-test-id="todo-button"]').should('be.visible')
        cy.get('[data-test-id="board-columns"]').should('be.visible')
        cy.get('[data-test-id="todo-button"]').click()
        cy.get('[data-test-id=cardname-input]').type('Task4')
        cy.get('[data-test-id=carddiscription-input]').type('Added task')
        cy.get('[data-test-id="form-submit"]').click()
        cy.contains('Task4').should('be.visible')
    })

    it('search by title back', () => {
        let length = 0
        cy.request('http://cs33699-django-n2mwk.tw1.ru/api/main_page/').then(res => res.json)
            .then(res => {
                length = res.body.length
                cy.visit('board')
                cy.get('[data-test-id="board-columns"]').should('be.visible')
                cy.get('[data-test-id="card-item"]').its('length').should('eq', length);
            })
        cy.contains('Task1').should('be.visible')

        // cy.get('[data-test-id="search"]').type("Task1").get('[data-test-id="card-item"]').its('length').should('eq', 1);
    })

    it('search by description back', () => {
        cy.request('http://cs33699-django-n2mwk.tw1.ru/api/main_page/').then(res => res.json)
            .then(res => {
                const length = res.body.length
                cy.visit('board')
                cy.get('[data-test-id="board-columns"]').should('be.visible')
                cy.get('[data-test-id="card-item"]').its('length').should('eq', length);
                cy.get('[data-test-id="search"]').type("Interior")
                // cy.get('[data-test-id="card-item"]').its('length').should('eq', 1);
            })
        cy.contains('Task1').should('be.visible')
    })

    it('sign out back', () => {
        cy.visit('board')
        cy.get('[data-test-id="board-columns"]').should('be.visible')
        cy.contains('Logout').should('be.visible').click()
        cy.get('[data-test-id="sign-in"]').should('be.visible')
    })

    it('date filter back', () => {
        cy.request('http://cs33699-django-n2mwk.tw1.ru/api/main_page/').then(res => res.json)
            .then(res => {
                const length = res.body.length
                cy.visit('board')
                cy.get('[data-test-id="board-columns"]').should('be.visible')
                cy.get('[data-test-id="card-item"]').its('length').should('eq', length);

                cy.get('[data-test-id="date-filter"]').type('2022-04-15')
                cy.contains('Task1').should('be.visible')

                // cy.get('[data-test-id="card-item"]').its('length').should('eq', 1);
            })
    })

    it('renders map back', () => {
        cy.visit('board')
        cy.get('[data-test-id="board-columns"]').should('be.visible')
        cy.get('[data-test-id="todo-button"]').click()
        cy.get('[data-test-id="user-lock"]').should('be.visible')
        cy.get('[data-test-id="show-map-button"]').click()
        cy.get('[data-test-id="map-global"]')
            .then(() => {
                cy.get('[data-test-id="accept-map-button"]').click().then(() => {
                    cy.get('[data-test-id="user-lock"]').should('be.visible')
                })
            })
    })

    it('user name back', () => {
        cy.visit('board')
        cy.get("[data-test-id='user-name']").should('have.text', 'testUser')
    })

    it('can not add invalid item back', () => {
        cy.request('http://cs33699-django-n2mwk.tw1.ru/api/main_page/').then(res => res.json)
            .then(res => {
                const length = res.body.length
                cy.visit('board')
                cy.get('[data-test-id="todo-button"]').should('be.visible')
                cy.get('[data-test-id="board-columns"]').should('be.visible')
                cy.get('[data-test-id="card-item"]').its('length').should('eq', length);
                cy.get('[data-test-id="todo-button"]').click()
                cy.get('[data-test-id="form-submit"]').click()
                cy.get('[data-test-id="card-item"]').its('length').should('eq', length);
            })
    })

})
