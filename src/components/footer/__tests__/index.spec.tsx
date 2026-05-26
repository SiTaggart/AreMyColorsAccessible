import { renderWithRouter } from "../../../test/render-with-router";
import { Footer } from "..";

describe("Footer", (): void => {
  const mockProps = {
    styles: {
      footerLinks: {
        color: "#fff",
      },
    },
  };

  it("renders without crashing", (): void => {
    const { asFragment } = renderWithRouter(<Footer />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders footerLink styles added", (): void => {
    const { asFragment } = renderWithRouter(<Footer {...mockProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
