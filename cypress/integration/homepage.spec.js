describe('Homepage', function() {
  describe('renders', () => {
    it('should load', function() {
      cy.visit('/');
      cy.document()
        .should('have.property', 'title')
        .and('eq', 'Are My Colours Accessible');
    });

    it('should have a heading level 1', () => {
      cy.visit('/');
      cy.get('.contrastResults-heading').should('contain', 'Yup');
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
      cy.get('.contrastResults-heading').should('contain', 'Nope');
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
      cy.get('.contrastResults-heading').should('contain', 'Nope');
    });
  });

  describe('text color sliders', () => {
    before(() => {
      cy.visit('/');
      cy.get('#textColor-hsl-Lightness')
        .invoke('val', 25)
        .trigger('input');
    });

    it('should update the input value', () => {
      cy.get('#textColor').should('have.value', '#404040');
    });

    it('should set body text color', () => {
      cy.get('body').should('have.css', 'color', 'rgb(64, 64, 64)');
    });

    it('should fail contrast', () => {
      cy.get('.contrastResults-heading').should('contain', 'Nope');
    });
  });

  describe('background color sliders', () => {
    before(() => {
      cy.visit('/');
      cy.get('#background-hsl-Hue')
        .invoke('val', 25)
        .trigger('input');
    });

    it('should update the input value', () => {
      cy.get('#background').should('have.value', '#CE6012');
    });

    it('should set body background color', () => {
      cy.get('body').should('have.css', 'background-color', 'rgb(206, 96, 18)');
    });

    it('should fail contrast', () => {
      cy.get('.contrastResults-heading').should('contain', 'Kinda');
    });
  });

  describe('footer navigation', () => {
    it('should navigate to the about page', () => {
      cy.visit('/');
      cy.get('.footer ul li:last-child').click();
      cy.url().should('eq', 'http://localhost:3000/about');
      cy.get('h1').should('contain', 'Are my Colours Accessible?');
    });
  });
});
