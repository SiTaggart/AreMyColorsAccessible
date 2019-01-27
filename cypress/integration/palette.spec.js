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

    it('should add a multiple colors to the matrix via comma and space separation', () => {
      cy.get('#palette-form-input').type('{selectall}#efefef,#999 red hotpink, #fff{enter}');
      cy.get('thead .colorMatrix-th').should('have.length', '5');
      cy.get('tbody .colorMatrix-tr').should('have.length', '5');
      cy.get('tbody .colorMatrix-tr:nth-child(3) > .colorMatrix-th').should('contain', '#FF0000');
    });

    it('should not accept dupes of colors in the input', () => {
      cy.get('#palette-form-input').type('{selectall}#fff #000 #333 #fff, #555{enter}');
      cy.get('thead .colorMatrix-th').should('have.length', '4');
      cy.get('tbody .colorMatrix-tr').should('have.length', '4');
      cy.get('tbody .colorMatrix-tr:nth-child(4) > .colorMatrix-th').should('contain', '#555555');
    });

    it('should continue to add new colours if colours are already added', () => {
      cy.get('#palette-form-input').type('{selectall}#efefef #222 #999{enter}');
      cy.get('thead .colorMatrix-th').should('have.length', '3');
      cy.get('tbody .colorMatrix-tr').should('have.length', '3');
      cy.get('tbody .colorMatrix-tr:nth-child(2) > .colorMatrix-th').should('contain', '#222222');
      cy.get('#palette-form-input').type('{selectall}#fff #555{enter}');
      cy.get('thead .colorMatrix-th').should('have.length', '5');
      cy.get('tbody .colorMatrix-tr').should('have.length', '5');
      cy.get('tbody .colorMatrix-tr:nth-child(5) > .colorMatrix-th').should('contain', '#555555');
    });

    it('should not add dupes of colors already added', () => {
      cy.get('#palette-form-input').type('{selectall}#ccc #ddd #eee{enter}');
      cy.get('thead .colorMatrix-th').should('have.length', '3');
      cy.get('tbody .colorMatrix-tr').should('have.length', '3');
      cy.get('tbody .colorMatrix-tr:nth-child(2) > .colorMatrix-th').should('contain', '#DDDDDD');
      cy.get('#palette-form-input').type('{selectall}#fff #ddd{enter}');
      cy.get('thead .colorMatrix-th').should('have.length', '4');
      cy.get('tbody .colorMatrix-tr').should('have.length', '4');
      cy.get('tbody .colorMatrix-tr:nth-child(4) > .colorMatrix-th').should('contain', '#FFFFFF');
    });

    it('should show an error when you add an invalid color', () => {
      cy.get('#palette-form-input').type('{selectall}dhfhfu{enter}');
      cy.get('#error-message-label-palette-form-input').should(
        'contain',
        'Please enter valid colors as comma or space separated hex values'
      );
    });
  });

  describe('color matrix', () => {
    beforeEach(() => {
      cy.visit('/palette');
    });

    it('should have a colour input for each column header', () => {
      cy.get('#palette-form-input').type('{selectall}orange blue pink red{enter}');
      cy.get('thead .colorMatrix-th .form-hsl-sliders--compact').should('have.length', '4');
    });

    it('should update the color matrix results when the colour input is updated', () => {
      cy.get('#palette-form-input').type('{selectall}orange blue pink red{enter}');
      cy.get(
        'tbody .colorMatrix-tr:nth-child(3) td:nth-child(2) .colorCard .colorCard-swatch'
      ).should('contain', 'Nope');
      cy.get('#colorhex-0').type('{selectall}brown');
      cy.get('#hsl-0-Hue').should('have.value', '0');
      cy.get('#hsl-0-Saturation').should('have.value', '59');
      cy.get('#hsl-0-Lightness').should('have.value', '41');
      cy.get('tbody .colorMatrix-tr:nth-child(1) > .colorMatrix-th').should('contain', '#A52A2A');
      cy.get(
        'tbody .colorMatrix-tr:nth-child(3) td:nth-child(2) .colorCard .colorCard-swatch'
      ).should('contain', 'Yup');
    });

    it('should update the color matrix results when the hue slider is updated', () => {
      cy.get('#palette-form-input').type('{selectall}orange blue pink red{enter}');
      cy.get(
        'tbody .colorMatrix-tr:nth-child(3) td:nth-child(3) .colorCard .colorCard-swatch'
      ).should('contain', 'Yup');
      cy.get('#hsl-1-Hue')
        .invoke('val', 25)
        .trigger('input');
      cy.get('#hsl-1-Hue').should('have.value', '25');
      cy.get('#hsl-1-Saturation').should('have.value', '100');
      cy.get('#hsl-1-Lightness').should('have.value', '50');
      cy.get('tbody .colorMatrix-tr:nth-child(2) > .colorMatrix-th').should('contain', '#FF6A00');
      cy.get('#colorhex-1').should('have.value', '#FF6A00');
      cy.get(
        'tbody .colorMatrix-tr:nth-child(3) td:nth-child(3) .colorCard .colorCard-swatch'
      ).should('contain', 'Nope');
    });

    it('should update the color matrix results when the saturation slider is updated', () => {
      cy.get('#palette-form-input').type('{selectall}orange blue brown red{enter}');
      cy.get(
        'tbody .colorMatrix-tr:nth-child(1) td:nth-child(4) .colorCard .colorCard-swatch'
      ).should('contain', 'Kinda');
      cy.get('#hsl-2-Saturation')
        .invoke('val', 95)
        .trigger('input');
      cy.get('#hsl-2-Hue').should('have.value', '0');
      cy.get('#hsl-2-Saturation').should('have.value', '95');
      cy.get('#hsl-2-Lightness').should('have.value', '41');
      cy.get('tbody .colorMatrix-tr:nth-child(3) > .colorMatrix-th').should('contain', '#CC0505');
      cy.get('#colorhex-2').should('have.value', '#CC0505');
      cy.get(
        'tbody .colorMatrix-tr:nth-child(1) td:nth-child(4) .colorCard .colorCard-swatch'
      ).should('contain', 'Nope');
    });

    it('should update the color matrix results when the lightness slider is updated', () => {
      cy.get('#palette-form-input').type('{selectall}orange blue pink red{enter}');
      cy.get(
        'tbody .colorMatrix-tr:nth-child(3) td:nth-child(5) .colorCard .colorCard-swatch'
      ).should('contain', 'Nope');
      cy.get('#hsl-3-Lightness')
        .invoke('val', 25)
        .trigger('input');
      cy.get('#hsl-3-Hue').should('have.value', '0');
      cy.get('#hsl-3-Saturation').should('have.value', '100');
      cy.get('#hsl-3-Lightness').should('have.value', '25');
      cy.get('tbody .colorMatrix-tr:nth-child(4) > .colorMatrix-th').should('contain', '#800000');
      cy.get('#colorhex-3').should('have.value', '#800000');
      cy.get(
        'tbody .colorMatrix-tr:nth-child(3) td:nth-child(5) .colorCard .colorCard-swatch'
      ).should('contain', 'Yup');
    });
  });
});
