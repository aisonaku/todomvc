const states = [
    {
        'fixture': 'mixedTasks.json',
        'context': 'mixed tasks in to-do list',
        'filterName': 'Active'
    },
    {
        'fixture': 'onlyActiveTasks.json',
        'context': 'all tasks are active in to-do list',
        'filterName': 'Active'
    },
    {
        'fixture': 'mixedTasks.json',
        'context': 'mixed tasks in to-do list',
        'filterName': 'Completed'
    },
    {
        'fixture': 'onlyCompletedTasks.json',
        'context': 'all tasks are completed in to-do list',
        'filterName': 'Completed'
    }
]

describe('Check filters', function () {
    states.forEach((state) => {
        context(`Check ${state.filterName} filter when ${state.context}`, function () {
            it(`check with data from ${state.fixture}`, function () {
                cy.fixture(state.fixture).then((baseTodos) => {
                    window.localStorage.setItem("react-todos", JSON.stringify(baseTodos));
                    cy.visit('/');

                    var expectedTasks = []
                    if (state.filterName === 'Active') {
                        expectedTasks = baseTodos.filter(task => task.completed === false)
                    }
                    if (state.filterName === 'Completed') {
                        expectedTasks = baseTodos.filter(task => task.completed)
                    }

                    cy.get('.filters').contains(state.filterName).click()
                    cy.get('.todo-list > li').each((task, i) => {
                        cy.wrap(task)
                            .should('contain.text', expectedTasks[i].title)
                    })
                })
            })
        })
    })

    it('Check that no items are visible for "Active" filter if all tasks are completed', function () {
        cy.fixture('onlyCompletedTasks.json').then((baseTodos) => {
            window.localStorage.setItem("react-todos", JSON.stringify(baseTodos));
            cy.visit('/');
            cy.get('.filters').contains("Active").click()
            cy.get('.todo-list').should('be.empty')
        })
    })

    it('Check that no items are visible for "Completed" filter if all tasks are active', function () {
        cy.fixture('onlyActiveTasks.json').then((baseTodos) => {
            window.localStorage.setItem("react-todos", JSON.stringify(baseTodos));
            cy.visit('/');
            cy.get('.filters').contains("Completed").click()
            cy.get('.todo-list').should('be.empty')
        })
    })
})