import React, { ReactElement } from 'react';
import { Global } from '@emotion/react';
import styled from '@emotion/styled';
import { breakpoint } from '../../../styles/utils';
import { Footer } from '../../footer';
import { useSiteData } from '../../../context/home';

const StyledAppContainer = styled.div`
  ${breakpoint('small')} {
    height: 100%;
  }
`;

interface AppContainerProps {
  children: React.ReactElement;
}

const AppContainer: React.FC<AppContainerProps> = ({
  children,
}: AppContainerProps): ReactElement => {
  const { siteData } = useSiteData();

  const styles = {
    footerLinks: {
      color: siteData.isLight ? '#343334' : '#fff',
    },
  };

  return (
    <StyledAppContainer>
      <Global
        styles={{
          body: {
            backgroundColor: siteData.colorCombos[1].hex,
            color: siteData.colorCombos[0].hex,
          },
        }}
      />

      {children}

      <Footer styles={styles} />
    </StyledAppContainer>
  );
};

export { AppContainer };
