describe("permission tests", () => {
  it("should redirect to login page if user is not authenticated on protected pages", () => {
    cy.viewport(1280, 720);
    cy.visit("/");
    cy.get("[data-test='link-list-desktop']").click();
    cy.url().should("contain", "/login");

    cy.visit("/account");
    cy.url().should("contain", "/login");
  });
});
