import { render } from '@testing-library/react';
import { PaletteInput } from '..';

describe('PaletteInput', (): void => {
  const mockOnColorAdd = vi.fn();

  it('renders without crashing', (): void => {
    const { asFragment } = render(<PaletteInput onColorAdd={mockOnColorAdd} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render an error message when passed', (): void => {
    const { asFragment } = render(
      <PaletteInput errorMessage="I'm an error" onColorAdd={mockOnColorAdd} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
