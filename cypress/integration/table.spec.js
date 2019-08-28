describe("Table", () => {
  it("visits the app", () => {
    cy.visit("/");
  });

  it("displays table", () => {
    cy.get("#infinite-table");
  });

  it("has five columns", () => {
    cy.get(".ReactVirtualized__Table__headerRow")
      .children()
      .should("have.length", 5);
  });

  it("shows loading spinner when loading table", () => {
    cy.get(".tableLoadingMessage")
      .get(".loader")
  });

  it("contains table entries", () => {
      cy.get(".ReactVirtualized__Table__row")
  })

  it("has modal but not displayed", () => {  
    cy.get(".modal").should('have.class', 'display-none')
  })

  it("has modal and displays on click of table row", () => {  
    cy.get(".ReactVirtualized__Table__row").first().click().get(".modal").should('have.class', 'display-block')
  })

});

