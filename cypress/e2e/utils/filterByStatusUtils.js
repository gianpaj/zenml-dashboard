export const filterByStatus = () => {
  cy.get('[data-testid="filter-icon"]').click();
  cy.get('[data-testid="column-name-dropdown"]').select('Status');
  cy.get('[data-testid="status-options"]').select('Completed');
  cy.get('table').should('be.visible');
};
