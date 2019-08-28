describe("Navbar", () => {
  it("visits the app", () => {
    cy.visit("/");
  });

  it("displays navbar", () => {
    cy.get("#header-navbar");
  });

  it("displays list of header elements", () => {
    cy.get("#header-navbar")
      .get("ul")
      .get("li")
      .should("have.length", 3);
  });

  it("has correct GitHub link", () => {
    cy.get("#header-navbar")
      .get(".headerRight")
      .get(".headerLink")
      .should(
        "have.attr",
        "href",
        "https://github.com/mjaycub/infinite-scrolling-users"
      );
  });
});
