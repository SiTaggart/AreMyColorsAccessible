import React, { ReactElement } from "react";
import { renderWithRouter } from "../../../../test/render-with-router";
import { AppContainer } from "..";
import { SiteDataProvider } from "../../../../context/home";

describe("AppContainer", (): void => {
  let ChildComponent: React.FunctionComponent = (): ReactElement<HTMLDivElement> => <div />;

  beforeAll((): void => {
    // eslint-disable-next-line react/display-name
    ChildComponent = (): ReactElement<HTMLDivElement> => <div />;
  });

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
        <AppContainer title="are my colors accessible">
          <ChildComponent />
        </AppContainer>
      </SiteDataProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("changes the footer link colors based on isLight prop", (): void => {
    const { asFragment } = renderWithRouter(
      <SiteDataProvider
        initialSiteData={{
          background: "#fff",
          colorCombos: [],
          isLight: true,
          textColor: "#000",
        }}
      >
        <AppContainer title="are my colors accessible">
          <ChildComponent />
        </AppContainer>
      </SiteDataProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
