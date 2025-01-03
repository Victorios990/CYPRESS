describe('home', () => {
  it('WebApp deve estar online', () => {
    cy.visit('http://localhost:3000')

    cy.title().should('eq','Gerencie suas tarefas com Mark L')
  })
})