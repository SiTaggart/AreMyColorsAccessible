/* eslint-disable jest/expect-expect */

describe('Homepage', () => {
  describe('renders', () => {
    it('should load', () => {
      cy.visit('/');
      cy.document().should('have.property', 'title').and('eq', 'Are My Colours Accessible');
      cy.percySnapshot('Homepage snapshot');
    });

    it('should have a heading level 1', () => {
      cy.visit('/');
      cy.get('[data-testid=contrastResults-heading]').should('contain', 'Yup');
    });

    it('should have the default background color', () => {
      cy.visit('/');
      cy.get('body').should('have.css', 'background-color', 'rgb(18, 118, 206)');
    });
  });

  describe('text color input', () => {
    before(() => {
      cy.visit('/');
      cy.get('#textColor').type('{selectall}#ccc');
    });

    it('should update the input value and set body color', () => {
      cy.get('#textColor').should('have.value', '#ccc');
      cy.get('body').should('have.css', 'color', 'rgb(204, 204, 204)');
      cy.get('[data-testid=contrastResults-heading]').should('contain', 'Nope');
      cy.location('search').should(
        'equal',
        '?background=%231276CE&colorCombos=%5Bobject%20Object%5D&colorCombos=%5Bobject%20Object%5D&isLight=false&textColor=%23ccc'
      );
    });

    it('should match the snapshot', () => {
      cy.percySnapshot('Homepage color input change snapshot');
    });
  });

  describe('background color input', () => {
    before(() => {
      cy.visit('/');
      cy.get('#background').type('{selectall}#ccc');
    });

    it('should update the input value', () => {
      cy.get('#background').should('have.value', '#ccc');
      cy.get('body').should('have.css', 'background-color', 'rgb(204, 204, 204)');
      cy.get('[data-testid=contrastResults-heading]').should('contain', 'Nope');
      cy.location('search').should(
        'equal',
        '?background=%23ccc&colorCombos=%5Bobject%20Object%5D&colorCombos=%5Bobject%20Object%5D&isLight=true&textColor=%23FFFFFF'
      );
    });

    it('should match the snapshot', () => {
      cy.percySnapshot('Homepage background input change snapshot');
    });
  });

  describe('text color sliders', () => {
    before(() => {
      cy.visit('/');
      cy.get('#textColor-hsl-Lightness').as('range').invoke('val', 25).trigger('input');
    });

    it('should update the input value', () => {
      cy.get('#textColor').should('have.value', '#404040');
      cy.get('body').should('have.css', 'color', 'rgb(64, 64, 64)');
      cy.get('[data-testid=contrastResults-heading]').should('contain', 'Nope');
      cy.location('search').should(
        'equal',
        '?background=%231276CE&colorCombos=%5Bobject%20Object%5D&colorCombos=%5Bobject%20Object%5D&isLight=false&textColor=%23404040'
      );
    });

    it('should match the snapshot', () => {
      cy.percySnapshot('Homepage color slider change snapshot');
    });
  });

  describe('background color sliders', () => {
    before(() => {
      cy.visit('/');
      cy.get('#background-hsl-Hue').as('range').invoke('val', 25).trigger('input');
    });

    it('should update the input value', () => {
      cy.get('#background').should('have.value', '#CE6012');
      cy.get('body').should('have.css', 'background-color', 'rgb(206, 96, 18)');
      cy.get('[data-testid=contrastResults-heading]').should('contain', 'Kinda');
      cy.location('search').should(
        'equal',
        '?background=%23CE6012&colorCombos=%5Bobject%20Object%5D&colorCombos=%5Bobject%20Object%5D&isLight=false&textColor=%23FFFFFF'
      );
    });

    it('should match the snapshot', () => {
      cy.percySnapshot('Homepage background slider change snapshot');
    });
  });

  describe('respond to querystring parameters', () => {
    it('should load a page with query string params and render accordingly', () => {
      cy.visit(
        '/?background=%23B9DDF8&colorCombos=%5Bobject%20Object%5D&colorCombos=%5Bobject%20Object%5D&isLight=true&textColor=%23B25334'
      );
      cy.get('body').should('have.css', 'background-color', 'rgb(185, 221, 248)');
      cy.get('body').should('have.css', 'color', 'rgb(178, 83, 52)');
      cy.get('[data-testid=contrastResults-heading]').should('contain', 'Kinda');
      cy.get('[data-testid=color-input-form]').should('have.css', 'color', 'rgb(52, 51, 52)');
      cy.get('#background').should('have.value', '#B9DDF8');
      cy.get('#background').should('have.css', 'border-color', 'rgb(52, 51, 52)');
      cy.get('#textColor').should('have.value', '#B25334');
      cy.get('#textColor').should('have.css', 'border-color', 'rgb(52, 51, 52)');
    });
    it('should match the snapshot', () => {
      cy.percySnapshot('Homepage query params snapshot');
    });
  });

  describe('footer navigation', () => {
    it('should navigate to the about page', () => {
      cy.visit('/');
      cy.get('footer ul li:last-child').click();
      cy.location('pathname').should('eq', '/about');
      cy.get('h1').should('contain', 'Are my Colours Accessible?');
    });

    it('about page should match the snapshot', () => {
      cy.percySnapshot('About page snapshot');
    });

    it('should navigate to the palette page', () => {
      cy.visit('/');
      cy.get('footer ul li:nth-child(2)').click();
      cy.location('pathname').should('eq', '/palette');
      cy.get('h1').should('contain', 'Add the colours from your palette');
    });
  });
});

/* eslint-enable jest/expect-expect */
