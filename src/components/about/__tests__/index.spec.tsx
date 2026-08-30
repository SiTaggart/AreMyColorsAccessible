import { render, screen } from "@testing-library/react";
import { About } from "..";

describe("About", (): void => {
  it("renders without crashing", (): void => {
    const { asFragment } = render(<About />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("explains APCA scoring and thresholds", (): void => {
    render(<About />);

    expect(screen.getByRole("heading", { name: "Two ways to score" })).toBeTruthy();
    expect(screen.getByText(/signed Lc value for lightness contrast/i)).toBeTruthy();
    expect(screen.getByText(/Content passes at \|Lc\| 60 or more/i)).toBeTruthy();
    expect(screen.getByText(/Fluent \|Lc\| ≥ 90/i)).toBeTruthy();
    expect(screen.getByText(/Non-text \|Lc\| ≥ 15/i)).toBeTruthy();
  });
});
