import { Home } from "..";
import { SiteDataProvider } from "../../../context/home";
import { renderWithRouter } from "../../../test/render-with-router";

describe("Home", (): void => {
  it("renders without crashing", (): void => {
    const { asFragment } = renderWithRouter(
      <SiteDataProvider
        initialSiteData={{
          background: "#000",
          colorCombos: [],
          isLight: false,
          textColor: "#fff",
        }}
      >
        <Home />
      </SiteDataProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
