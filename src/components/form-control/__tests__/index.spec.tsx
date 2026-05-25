import { render } from '@testing-library/react';
import { FormControl } from '..';

describe('FormControl', (): void => {
  it('renders without crashing', (): void => {
    const { asFragment } = render(<FormControl>children</FormControl>);
    expect(asFragment()).toMatchSnapshot();
  });
});
