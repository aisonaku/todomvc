it('Checks that new tasks can be added to the todo-list', () => {
    const expectedTodos = ["Call mom +3580000000. Today!",
        "Buy avocados",
        "Check the weather https://en.ilmatieteenlaitos.fi/local-weather"
    ]

    cy.visit('/')


    expectedTodos.forEach((todoTask) => {
        cy.get('.new-todo').type(todoTask + '{enter}')
    })


    cy.get('.todo-list').each((task, i) => {
        cy
            .wrap(task)
            .should('contain.text', expectedTodos[i])
    })
})