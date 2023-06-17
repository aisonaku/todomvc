const expectedTodos = ["Call mom +3580000000. Today!",
    "Buy avocados",
    "Check the weather https://en.ilmatieteenlaitos.fi/local-weather",
    "Wash the car",
    "Go to the store"
]

it('Check that it is possible to see only active tasks', () => {
    cy.visit('/')

    cy.log('Add tasks to the list')
    expectedTodos.forEach((todoTask) => {
        cy.get('.new-todo').type(todoTask + '{enter}')
    })

    cy.log('Check that all tasks are added')
    cy.get('.todo-list > li').then($els => {
        return Array.from($els).map(el => el.innerText)
      }).should('deep.equal', expectedTodos)

    cy.log('Mark some tasks as completed')
    cy.get('.todo-list > li').get('input.toggle').eq(1).click()
    cy.get('.todo-list > li').get('input.toggle').eq(3).click()
    cy.get('.todo-list > li').get('input.toggle').eq(4).click()

    cy.log('Filter only active tasks')
    cy.get('.filters').contains('Active').click()

    cy.log('Check that only active tasks are visible')
    cy.get('.todo-list > li').then($els => {
        return Array.from($els).map(el => el.innerText)
      }).should('deep.equal', [expectedTodos[0], expectedTodos[2]])
})

it('Check that it is possible to remove all completed tasks from the list and add more tasks', () => {
    cy.visit('/')

    cy.log('Add tasks to the list')
    expectedTodos.slice(0, 3).forEach((todoTask) => {
        cy.get('.new-todo').type(todoTask + '{enter}')
    })

    cy.log('Mark some tasks as completed')
    cy.get('.todo-list > li').get('input.toggle').eq(0).click()
    cy.get('.todo-list > li').get('input.toggle').eq(2).click()

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
    cy.get('.todo-list > li').then($els => {
        return Array.from($els).map(el => el.innerText)
      }).should('deep.equal', [expectedTodos[1], expectedTodos[3], expectedTodos[4]])        
})