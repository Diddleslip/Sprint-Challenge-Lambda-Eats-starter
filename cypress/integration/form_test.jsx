describe("test our form", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/pizza");
    })
    it("add text to input to name", () => {
        cy.get('input[name="name"]')
        .type("Big Chungus")
        .should("have.value", "Big Chungus");
        cy.get('#dropdown')
        .select("Large")
        .should("have.value", "Large");
        cy.get(':nth-child(6) > input').click()
        cy.get("textarea")
        .type("Cherry Coke")
        .should("have.value", "Cherry Coke");
        cy.get('button').click()
    })
})