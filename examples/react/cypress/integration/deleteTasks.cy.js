describe("Check task deletion", () => {
	beforeEach(function () {
		cy.fixture("mixedTasks.json")
			.then((baseTasks) => {
				window.localStorage.setItem("react-todos", JSON.stringify(baseTasks));
			})
			.as("baseTasks");
		cy.visit("/");
	});

	it("Check active task can be remove", function () {
		const firstActiveTaskIndex = this.baseTasks.findIndex(
			(task) => task.completed === false
		);
		let expectedTasks = this.baseTasks;
		expectedTasks.splice(firstActiveTaskIndex, 1);

		cy.get(".todo-list li")
			.eq(firstActiveTaskIndex)
			.realHover("mouse")
			.find(".destroy")
			.click();

		cy.getAllLocalStorage().then((result) => {
			cy.wrap(result["https://todomvc.com"]["react-todos"]).should(
				"deep.equal",
				JSON.stringify(expectedTasks)
			);
		});
	});

	it("Check completed task can be remove", function () {
		const firstCompletedTaskIndex = this.baseTasks.findIndex(
			(task) => task.completed
		);
		let expectedTasks = this.baseTasks;
		expectedTasks.splice(firstCompletedTaskIndex, 1);

		cy.visit("/");
		cy.get(".todo-list li")
			.eq(firstCompletedTaskIndex)
			.realHover("mouse")
			.find(".destroy")
			.click();

		cy.getAllLocalStorage().then((result) => {
			cy.wrap(result["https://todomvc.com"]["react-todos"]).should(
				"deep.equal",
				JSON.stringify(expectedTasks)
			);
		});
	});

	it("Check all completed tasks can be removed with one button", function () {
		const expectedTasks = this.baseTasks.filter(
			(task) => task.completed === false
		);

		cy.get(".clear-completed").click();

		cy.getAllLocalStorage().then((result) => {
			cy.wrap(result["https://todomvc.com"]["react-todos"]).should(
				"deep.equal",
				JSON.stringify(expectedTasks)
			);
		});
	});
});
