// https://docs.cypress.io/api/table-of-contents

describe("My First Test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/");
  });

  it("Fetch user loader", () => {
    cy.get("#root > .asv-loader > .asv-loader-spin").should("exist");
    cy.get(".asv-services-card > .asv-loader > .asv-loader-skeleton").should(
      "exist"
    );
  });

  it("Test search functionality", () => {
    cy.wait(5000);
    cy.get(".asv-services-search").type("Practical");
    cy.wait(2000);
    cy.get(
      ".asv-services-cards > .asv-services-card:nth-child(1) .asv-services-card-name"
    ).should("contain.text", "Practical");
  });

  it("Test Pagination", () => {
    cy.wait(5000);
    cy.get(".asv-pagination-left-wrapper").should("be.disabled");
    cy.get(".asv-pagination-right-wrapper").click();
    cy.wait(2000);
    cy.get(".asv-pagination-left-wrapper").should("be.enabled");
  });
});
