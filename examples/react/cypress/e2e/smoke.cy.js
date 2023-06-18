const expectedTodos = ["Call mom +3580000000. Today!",
    "Buy avocados",
    "Check the weather https://en.ilmatieteenlaitos.fi/local-weather",
    "Wash the car",
    "Go to the store"
]
describe('Smoke tests', function () {
    it('Check that it is possible to complete all the tasks', () => {
        cy.visit('/')

        cy.log('Add tasks to the list')
        expectedTodos.forEach((todoTask) => {
            cy.get('.new-todo').type(todoTask + '{enter}')
        })

        cy.log('Check that all tasks are added')
        cy.get('.todo-list li').then($els => {
            return Array.from($els).map(el => el.innerText)
        }).should('deep.equal', expectedTodos)

        cy.log('Mark some tasks as completed')
        cy.get('.todo-list li').eq(1).find('input.toggle').click()
        cy.get('.todo-list li').eq(3).find('input.toggle').click()
        cy.get('.todo-list li').eq(4).find('input.toggle').click()

        cy.log('Filter only active tasks')
        cy.get('.filters').contains('Active').click()

        cy.log('Check that only active tasks are visible')
        cy.get('.todo-list li').then($els => {
            return Array.from($els).map(el => el.innerText)
        }).should('deep.equal', [expectedTodos[0], expectedTodos[2]])

        cy.log('Mark the next task as completed')
        cy.get('.todo-list li').eq(0).find('input.toggle').click()

        cy.log('Check that only one task is visible with "Active" filter is applied')
        cy.get('.todo-list li').should('have.length', 1)

        cy.log('Mark the last task as completed')
        cy.get('.todo-list li').find('input.toggle').click()

        cy.log('Check that list of active tasks is empty')
        cy.get('.todo-list').should('be.empty')

        cy.log('Check that counter of active tasks is 0')
        cy.get('.todo-count').contains('0 items left')        
    })

    it('Check that it is possible to remove all completed tasks from the list and add more tasks', () => {
        cy.visit('/')

        cy.log('Add tasks to the list')
        expectedTodos.slice(0, 3).forEach((todoTask) => {
            cy.get('.new-todo').type(todoTask + '{enter}')
        })

        cy.log('Mark some tasks as completed')
        cy.get('.todo-list li').eq(0).find('input.toggle').click()
        cy.get('.todo-list li').eq(2).find('input.toggle').click()

        cy.log('Filter only completed tasks')
        cy.get('.filters').contains('Completed').click()

        cy.log('Remove all completed tasks')
        cy.get('.clear-completed').click()

        cy.log('Check that no completed tasks are visible')
        cy.get('.todo-list').should('be.empty')

        cy.log('Add more tasks')
        expectedTodos.slice(3).forEach((todoTask) => {
            cy.get('.new-todo').type(todoTask + '{enter}')
        })

        cy.log('Filter back to all tasks')
        cy.get('.filters').contains('All').click()

        cy.log('Check that all tasks are added')
        cy.get('.todo-list li').then($els => {
            return Array.from($els).map(el => el.innerText)
        }).should('deep.equal', [expectedTodos[1], expectedTodos[3], expectedTodos[4]])
    })
})