describe('react-test-demo', () => {
  beforeEach(() => cy.visit('/'));

  it('should display user on successful login', () => {
    // Custom command example, see `../support/commands.ts` file
    cy.login('my-email@something.com', 'myPassword');
    cy.get("[data-testid=login__result-display]", {timeout:1000}).should('be.visible');
  });
});
