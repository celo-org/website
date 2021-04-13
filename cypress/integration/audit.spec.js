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
          accessibility: 100,
          'best-practices': 100,
          seo: 100,
          pwa: 100,
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
          accessibility: 100,
          'best-practices': 100,
          seo: 100,
          pwa: 100
        }
      );
    });
  
    it('should pass pa11y audit', () => {
      cy.pa11y();
    });
  });
});
