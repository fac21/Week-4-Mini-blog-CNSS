describe("homepage", () => {
  it("Has correct title", () => {
    cy.visit("/");
    cy.get("h1").contains("Movie Review Blog!");
  });

  it("Movie link works", () => {
    cy.visit("/");
    cy.contains("superman").click();
    cy.url().should("include", "/search?movie=superman");
  });
});

describe("movie review page", () => {});
