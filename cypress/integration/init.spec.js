describe("Cypress", () => {
  it("is working", () => {
    expect(true).to.equal(true);
  });

  it("visits the app", () => {
    cy.visit('/');
  });

  it('get the document object', () => {
    cy.document().should('have.property', 'charset').and('eq', 'UTF-8')
  })
});
