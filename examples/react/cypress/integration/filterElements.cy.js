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

                    var expectedTasksTitles = []
                    if (state.filterName === 'Active') {
                        expectedTasksTitles = baseTodos.filter(task => task.completed === false).map(task => task.title)
                    }
                    if (state.filterName === 'Completed') {
                        expectedTasksTitles = baseTodos.filter(task => task.completed).map(task => task.title)
                    }

                    cy.get('.filters').contains(state.filterName).click()

                    cy.get('.todo-list > li').then($els => {
                        return Array.from($els).map(el => el.innerText)
                      }).should('deep.equal', expectedTasksTitles)
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