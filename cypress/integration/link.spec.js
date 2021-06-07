/// <reference types="cypress" />

describe('Links', () => {
  describe('Celo.org HomePage', () => {
    before(() => {
      cy.visit('');
    });

    // TODO: Move to a better spec 
    it.skip('should throw 404 for unknown page', () => {
      cy.log('Testing Get to /iDoNotExist')
      cy.request({url: 'iDoNotExist', failOnStatusCode: false}).its('status').should('eq', 404);
    });

    describe('Top Banner (Mobile)', () => {
      before(() => {
        cy.get('[class$=MobileMenuIcon]').click();
      });

      it('should have correct link for \'About\'', () => {
        cy.get('[data-cy=About] a').should('have.attr', 'href', '/about');
        cy.request(`about`).its('status').should('eq', 200);
      });
  
      it('should have correct link for \'Join\'', () => {
        cy.get('[data-cy=Join] a').should('have.attr', 'href', '/jobs');
        cy.request(`jobs`).its('status').should('eq', 200);
      });
  
      it.skip('should have correct link for \'Validators\'', () => {
        cy.get('[data-cy=Validators] a').should('have.attr', 'href', '/validators');
        cy.request(`validators`).its('status').should('eq', 200);
      });

      it('should have correct link for \'Developers\'', () => {
        cy.get('[data-cy=Developers] a').should('have.attr', 'href', '/developers');
        cy.request(`developers`).its('status').should('eq', 200);
      });

      it('should have correct link for \'Alliance\'', () => {
        cy.get('[data-cy=Alliance] a').should('have.attr', 'href', '/alliance');
        cy.request(`alliance`).its('status').should('eq', 200);
      });

      it('should have correct link for \'Community\'', () => {
        cy.get('[data-cy=Community] a').should('have.attr', 'href', '/community');
        cy.request(`community`).its('status').should('eq', 200);
      });
    });
  });
});
