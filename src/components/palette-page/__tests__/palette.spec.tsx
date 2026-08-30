import { PaletteDataProvider } from "../../../context/palette";
import { renderWithRouter } from "../../../test/render-with-router";
import { PalettePage } from "..";

describe("Palette Page", (): void => {
  it("renders without crashing", (): void => {
    const { asFragment } = renderWithRouter(
      <PaletteDataProvider>
        <PalettePage />
      </PaletteDataProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
