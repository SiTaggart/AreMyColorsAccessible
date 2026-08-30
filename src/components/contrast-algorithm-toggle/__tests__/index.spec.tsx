import { fireEvent, render, screen } from "@testing-library/react";
import { ContrastAlgorithmToggle } from "..";

describe("ContrastAlgorithmToggle", (): void => {
  it("selects WCAG 2.x", (): void => {
    const onChange = vi.fn();
    render(<ContrastAlgorithmToggle algorithm="apca" onChange={onChange} />);

    fireEvent.click(screen.getByRole("radio", { name: "WCAG 2.x" }));

    expect(onChange).toHaveBeenCalledWith("wcag2");
  });

  it("selects APCA", (): void => {
    const onChange = vi.fn();
    render(<ContrastAlgorithmToggle algorithm="wcag2" onChange={onChange} />);

    fireEvent.click(screen.getByRole("radio", { name: "APCA" }));

    expect(onChange).toHaveBeenCalledWith("apca");
  });
});
