describe('Palette', function() {
  describe('renders', () => {
    it('should load', function() {
      cy.visit('/palette');
      cy.document()
        .should('have.property', 'title')
        .and('eq', 'Palette checker - Are My Colours Accessible');
    });

    it('should have a heading level 1', () => {
      cy.visit('/palette');
      cy.get('h1').should('contain', 'Add the colours from your palette');
    });
  });

  describe('palette input', () => {
    beforeEach(() => {
      cy.visit('/palette');
    });

    it('should add a color to the matrix', () => {
      cy.get('#palette-form-input').type('{selectall}#ccc{enter}');
      cy.get('thead .colorMatrix-th').should('have.length', '1');
      cy.get('tbody .colorMatrix-tr').should('have.length', '1');
      cy.get('tbody .colorMatrix-tr:nth-child(1) > .colorMatrix-th').should('contain', '#CCCCCC');
    });

    it('should add a multiple colors to the matrix via space separation', () => {
      cy.get('#palette-form-input').type('{selectall}#ccc #fff #000{enter}');
      cy.get('thead .colorMatrix-th').should('have.length', '3');
      cy.get('tbody .colorMatrix-tr').should('have.length', '3');
      cy.get('tbody .colorMatrix-tr:nth-child(3) > .colorMatrix-th').should('contain', '#000000');
    });

    it('should add a multiple colors to the matrix via comma separation', () => {
      cy.get('#palette-form-input').type('{selectall}#eee,#555, #efefef, blue{enter}');
      cy.get('thead .colorMatrix-th').should('have.length', '4');
      cy.get('tbody .colorMatrix-tr').should('have.length', '4');
      cy.get('tbody .colorMatrix-tr:nth-child(3) > .colorMatrix-th').should('contain', '#EFEFEF');
    });

    it('should add a multiple colors to the matrix via comma and space separation', () => {});

    it('should not accept dupes of colors in the input', () => {});

    it('should not add dupes of colors already added', () => {});

    it('should show an error when you add an invalid color', () => {});
  });

  describe('color matrix', () => {});
});
