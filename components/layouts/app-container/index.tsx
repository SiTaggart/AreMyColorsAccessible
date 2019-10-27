import React, { ReactElement } from 'react';
import Head from 'next/head';
import styled from '@emotion/styled';
import { breakpoint } from '../../../styles/utils';
import Footer from '../../footer';
import { useSiteData } from '../../../context/home';

const StyledAppContainer = styled.div`
  ${breakpoint('small')} {
    height: 100%;
  }
`;

interface AppContainerProps {
  children: React.ReactElement;
  title?: string;
}

const AppContainer: React.FC<AppContainerProps> = ({
  children,
  title = 'Are My Colours Accessible',
}: AppContainerProps): ReactElement => {
  const { siteData } = useSiteData();

  const styles = {
    footerLinks: {
      color: siteData.isLight ? '#343334' : '#fff',
    },
  };

  return (
    <StyledAppContainer>
      <Head>
        <title>{title}</title>
        <style>{`
          body {
            background-color: ${siteData.colorCombos[1].hex};
            color: ${siteData.colorCombos[0].hex};
          }
        `}</style>
      </Head>

      {children}

      <Footer styles={styles} />
    </StyledAppContainer>
  );
};

export default AppContainer;
