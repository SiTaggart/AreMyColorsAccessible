import { render, screen } from "@testing-library/react";
import { About } from "..";

describe("About", (): void => {
  it("renders without crashing", (): void => {
    const { asFragment } = render(<About />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("explains APCA scoring and thresholds", (): void => {
    render(<About />);

    expect(screen.getByRole("heading", { name: "WCAG 2.x vs APCA" })).toBeTruthy();
    expect(screen.getByText(/signed Lc \(lightness contrast\) value/i)).toBeTruthy();
    expect(screen.getByText(/Content text passes \(\|Lc\| ≥ 60\)/i)).toBeTruthy();
    expect(screen.getByText(/Fluent text \|Lc\| ≥ 90/i)).toBeTruthy();
    expect(screen.getByText(/Non-text \|Lc\| ≥ 15/i)).toBeTruthy();
  });
});
