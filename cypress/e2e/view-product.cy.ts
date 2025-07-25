describe("test view products flow", () => {
  it("should see products and an individual product", () => {
    cy.visit("/products");
    cy.wait(1000);
    cy.get("[data-test='search-input']").type("Estante");

    cy.get("[data-test='search-button']").click();

    cy.get("[data-test='product-card-7']").should("be.visible").as("product");

    cy.get("@product").should("be.visible");

    cy.get("[data-test='view-details-button-7']")
      .should("be.visible")
      .as("viewDetailsButton");

    cy.get("@viewDetailsButton").click();

    cy.url().should("contain", "/products/7");
  });
});
