import { render } from '@testing-library/react';

import { PalettePage } from '..';
import { PaletteDataProvider } from '../../../context/palette';

describe('Palette Page', (): void => {
  it('renders without crashing', (): void => {
    const { asFragment } = render(
      <PaletteDataProvider>
        <PalettePage />
      </PaletteDataProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
