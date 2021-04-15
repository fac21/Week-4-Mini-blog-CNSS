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

describe("movie review page", () => {
  it("Can add a post", () => {
    cy.visit("/search?movie=matrix");
    //reviewer input, review input and then click
    cy.get("form").find("input[name='reviewer']").type("neville");
    cy.get("form").find("input[name='review']").type("cool!");
    cy.get("form").find("button").click();
    //test if output matched to the input.
    cy.get("li").eq(2).should("contain", "neville");
    cy.get("li").eq(2).should("contain", "cool!");
  });
});
