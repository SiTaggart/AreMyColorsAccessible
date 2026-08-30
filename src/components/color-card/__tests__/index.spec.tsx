import { render } from "@testing-library/react";
import { ColorCard, ColorCardProps } from "..";

describe("ColorCard", (): void => {
  const mockProps: ColorCardProps = {
    color: "#000",
    heading: "Yup",
    metricLabel: "Contrast Ratio",
    metricValue: "21 : 1",
    rows: [
      { label: "Small", meets: true, value: "AAA" },
      { label: "Large", meets: true, value: "AAA" },
    ],
  };

  it("renders without crashing", (): void => {
    const { asFragment } = render(<ColorCard {...mockProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render a not important card", (): void => {
    const { asFragment } = render(<ColorCard {...mockProps} isNotImportant />);
    expect(asFragment()).toMatchSnapshot();
  });
});
