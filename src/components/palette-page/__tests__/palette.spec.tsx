import { fireEvent } from "@testing-library/react";
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

  it("selects the APCA algorithm", (): void => {
    const { getByRole } = renderWithRouter(
      <PaletteDataProvider>
        <PalettePage />
      </PaletteDataProvider>,
    );

    const apca = getByRole("radio", { name: "APCA" });
    fireEvent.click(apca);
    expect(getByRole("radio", { checked: true, name: "APCA" })).toBe(apca);
  });
});
