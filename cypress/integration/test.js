it("Has correct title", () =>  {
    cy.visit("/");
    cy.get("h1").contains("Movie review blog!");  
})