import { render, screen } from "@testing-library/react";
import { About } from "..";

describe("About", (): void => {
  it("renders without crashing", (): void => {
    const { asFragment } = render(<About />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("explains how to read WCAG and APCA scores", (): void => {
    render(<About />);

    expect(screen.getByRole("heading", { name: "Two algorithms" })).toBeTruthy();
    expect(screen.getByText(/This site uses WCAG 2 and APCA/i)).toBeTruthy();
    expect(screen.getByText(/Yup/)).toBeTruthy();
    expect(screen.getByText(/Fluent 90/i)).toBeTruthy();
  });
});
