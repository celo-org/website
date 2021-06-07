/// <reference types="cypress" />

describe('Audits', () => {
  describe('Celo.org HomePage', () => {
    beforeEach(() => {
      cy.visit('');
    });
  
    it('should pass lighthouse audit (desktop)', () => {
      // TODO: Determine appropriate levels
      cy.lighthouse(
        {
          accessibility: 89,
          'best-practices': 87,
          seo: 90,
        },
        {
          formFactor: 'desktop',
          screenEmulation: {
            mobile: false,
            width: 1920,
            height: 1080,
            deviceScaleFactor: 1,
            disabled: false,
          },
        }
      );
    });
  
    it('should pass lighthouse audit (mobile)', () => {
      cy.lighthouse(
        {
          accessibility: 88,
          'best-practices': 93,
          seo: 92,
        }
      );
    });
  
    it.skip('should pass pa11y audit', () => {
      cy.pa11y();
    });
  });
});
