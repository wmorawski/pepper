describe('Play page', () => {
  it('Visits the initial project page and redirect to Play page', () => {
    cy.visit('/');
    cy.url().should('contain', '/play');
  });

  it('Should play game with People resource', () => {
    cy.visit('/');
    cy.get('button[mat-stroked-button]').contains('people').click();
    cy.url().should('contain', '/play/people');
    cy.get('mat-card').should('have.length', 2);
    cy.get('button[mat-flat-button]').contains('Play again').should('be.visible');
    cy.get('mat-dialog-container').should('be.visible');
  });

  it('Should re-play the game', () => {
    cy.visit('/play/people');
    const scores = cy.get('.players').find('h5');
    scores.each($el => {
      cy.wrap($el).should('contain.text', '0');
    });
    const playAgainButton = cy.get('button[mat-flat-button]').contains('Play again');
    playAgainButton.should('be.visible');
    cy.get('mat-dialog-container').should('be.visible').clickOutside();
    scores.contains('0').should('have.length', 1);
    playAgainButton.click();
    cy.get('mat-dialog-container').should('be.visible').clickOutside();
    cy.get('mat-card').should('have.length', 2);
  });
});
