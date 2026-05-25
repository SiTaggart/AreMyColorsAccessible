import { Footer } from '..';
import { renderWithRouter } from '~/test/render';

describe('Footer', (): void => {
  const mockProps = {
    styles: {
      footerLinks: {
        color: '#fff',
      },
    },
  };

  it('renders without crashing', async (): Promise<void> => {
    const { asFragment } = await renderWithRouter(<Footer />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders footerLink styles added', async (): Promise<void> => {
    const { asFragment } = await renderWithRouter(<Footer {...mockProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
