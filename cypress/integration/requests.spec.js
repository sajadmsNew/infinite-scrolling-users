describe('Request', () => {
    it('displays list of 20 users from API', () => {
      cy.request('https://randomuser.me/api/?page=$1&results=20&seed=abc')
        .should((response) => {
          expect(response.status).to.eq(200)
          expect(response.body.results).to.have.length(20)
        })
    })
  })