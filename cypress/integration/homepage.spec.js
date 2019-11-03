/* eslint-disable jest/expect-expect */

const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
  window.HTMLInputElement.prototype,
  'value'
).set;
const changeRangeInputValue = $range => value => {
  nativeInputValueSetter.call($range[0], value);
  $range[0].dispatchEvent(new Event('change', { value, bubbles: true }));
};

describe('Homepage', () => {
  describe('renders', () => {
    it('should load', () => {
      cy.visit('/');
      cy.document()
        .should('have.property', 'title')
        .and('eq', 'Are My Colours Accessible');
      cy.percySnapshot('Homepage snapshot');
    });

    it('should have a heading level 1', () => {
      cy.visit('/');
      cy.get('[data-test=contrastResults-heading]').should('contain', 'Yup');
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

    it('should update the input value', () => {
      cy.get('#textColor').should('have.value', '#ccc');
    });

    it('should set body text color', () => {
      cy.get('body').should('have.css', 'color', 'rgb(204, 204, 204)');
    });

    it('should fail contrast', () => {
      cy.get('[data-test=contrastResults-heading]').should('contain', 'Nope');
    });

    it('should update the url', () => {
      cy.url().should(
        'equal',
        'http://localhost:3000/?background=%231276CE&colorCombos=%5Bobject%20Object%5D&colorCombos=%5Bobject%20Object%5D&isLight=false&textColor=%23ccc'
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
    });

    it('should set body background color', () => {
      cy.get('body').should('have.css', 'background-color', 'rgb(204, 204, 204)');
    });

    it('should fail contrast', () => {
      cy.get('[data-test=contrastResults-heading]').should('contain', 'Nope');
    });

    it('should update the url', () => {
      cy.url().should(
        'equal',
        'http://localhost:3000/?background=%23ccc&colorCombos=%5Bobject%20Object%5D&colorCombos=%5Bobject%20Object%5D&isLight=true&textColor=%23FFFFFF'
      );
    });

    it('should match the snapshot', () => {
      cy.percySnapshot('Homepage background input change snapshot');
    });
  });

  describe('text color sliders', () => {
    before(() => {
      cy.visit('/');
      // eslint-disable-next-line promise/catch-or-return
      cy.get('#textColor-hsl-Lightness').then(input => changeRangeInputValue(input)(25));
    });

    it('should update the input value', () => {
      cy.get('#textColor').should('have.value', '#404040');
    });

    it('should set body text color', () => {
      cy.get('body').should('have.css', 'color', 'rgb(64, 64, 64)');
    });

    it('should fail contrast', () => {
      cy.get('[data-test=contrastResults-heading]').should('contain', 'Nope');
    });

    it('should update the url', () => {
      cy.url().should(
        'equal',
        'http://localhost:3000/?background=%231276CE&colorCombos=%5Bobject%20Object%5D&colorCombos=%5Bobject%20Object%5D&isLight=false&textColor=%23404040'
      );
    });

    it('should match the snapshot', () => {
      cy.percySnapshot('Homepage color slider change snapshot');
    });
  });

  describe('background color sliders', () => {
    before(() => {
      cy.visit('/');
      // eslint-disable-next-line promise/catch-or-return
      cy.get('#background-hsl-Hue').then(input => changeRangeInputValue(input)(25));
    });

    it('should update the input value', () => {
      cy.get('#background').should('have.value', '#CE6012');
    });

    it('should set body background color', () => {
      cy.get('body').should('have.css', 'background-color', 'rgb(206, 96, 18)');
    });

    it('should fail contrast', () => {
      cy.get('[data-test=contrastResults-heading]').should('contain', 'Kinda');
    });

    it('should update the url', () => {
      cy.url().should(
        'equal',
        'http://localhost:3000/?background=%23CE6012&colorCombos=%5Bobject%20Object%5D&colorCombos=%5Bobject%20Object%5D&isLight=false&textColor=%23FFFFFF'
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
      cy.get('[data-test=contrastResults-heading]').should('contain', 'Kinda');
      cy.get('[data-test=color-input-form]').should('have.css', 'color', 'rgb(52, 51, 52)');
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
      cy.url().should('eq', 'http://localhost:3000/about');
      cy.get('h1').should('contain', 'Are my Colours Accessible?');
    });

    it('about page should match the snapshot', () => {
      cy.percySnapshot('About page snapshot');
    });

    it('should navigate to the palette page', () => {
      cy.visit('/');
      cy.get('footer ul li:nth-child(2)').click();
      cy.url().should('eq', 'http://localhost:3000/palette');
      cy.get('h1').should('contain', 'Add the colours from your palette');
    });
  });
});

/* eslint-enable jest/expect-expect */
