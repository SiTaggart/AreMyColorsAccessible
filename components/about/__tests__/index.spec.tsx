import { render } from "@testing-library/react";
import { About } from "..";

describe("About", (): void => {
  it("renders without crashing", (): void => {
    const { asFragment } = render(<About />);
    expect(asFragment()).toMatchSnapshot();
  });
});
