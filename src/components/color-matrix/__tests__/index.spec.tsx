import { render, fireEvent } from "@testing-library/react";
import ColorCombos from "color-combos";
import { ColorMatrix, ColorMatrixProps } from "..";

describe("ColorMatrix", (): void => {
  const onColorChangeMock = vi.fn();
  const mockColorColorCombos = ColorCombos(["#fff", "#ccc", "#777", "#000"]);
  let mockProps: ColorMatrixProps;

  if (mockColorColorCombos !== false) {
    mockProps = {
      algorithm: "wcag2",
      colorCombos: mockColorColorCombos,
      colors: ["#fff", "#ccc", "#777", "#000"],
      onColorChange: onColorChangeMock,
    };
  }

  it("renders without crashing", (): void => {
    const { asFragment } = render(<ColorMatrix {...mockProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should call the onColorChange method when a color is changed in an input", (): void => {
    const { getByTestId } = render(<ColorMatrix {...mockProps} />);
    fireEvent.change(getByTestId("colorhex-0"), { target: { value: "#ccc" } });
    expect(onColorChangeMock).toHaveBeenCalledWith("#ccc", 0);
  });

  it("should call the onColorChange method when a color is changed in on a slider", (): void => {
    const { getByTestId } = render(<ColorMatrix {...mockProps} />);
    fireEvent.change(getByTestId("hsl-0-Lightness"), { target: { value: "12" } });
    expect(onColorChangeMock).toHaveBeenCalledWith("#1F1F1F", 0);
  });

  it("renders directional APCA card results", (): void => {
    const colorCombos = ColorCombos(["#fff", "#000"]);
    if (colorCombos === false) {
      throw new Error("Expected valid color combinations");
    }

    const { getAllByText, getAllByTitle } = render(
      <ColorMatrix
        algorithm="apca"
        colorCombos={colorCombos}
        colors={["#fff", "#000"]}
        onColorChange={onColorChangeMock}
      />,
    );

    expect(getAllByText(/Body:/)).toHaveLength(2);
    const metricValues = getAllByTitle("APCA Lc").map((element) => element.textContent);
    expect(metricValues).toHaveLength(2);
    expect(metricValues[0]).not.toBe(metricValues[1]);
  });
});
