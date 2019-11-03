import React, { ReactElement } from 'react';
import NextLink from 'next/link';
import styled from '@emotion/styled';
import { Link } from '../typography';

interface FooterProps {
  styles?: { footerLinks?: object };
}

const StyledFooter = styled.footer`
  padding: 5rem 0 1rem;
  text-align: center;
  width: 100%;
`;
const StyledFooterNav = styled.nav``;
const StyledFooterNavList = styled.ul`
  list-style: none;
  margin: 0 0 1rem;
  padding: 0;
`;
const StyledFooterNavListItem = styled.li`
  display: inline-block;
  padding: 0 1rem;
`;
const StyledFooterAnchor = styled(Link)`
  transition: color 400ms ease-in;
`;

const Footer: React.FC<FooterProps> = ({ styles }: FooterProps): ReactElement<HTMLDivElement> => {
  const linkStyles: object | undefined = styles ? styles.footerLinks : undefined;
  return (
    <StyledFooter>
      <StyledFooterNav>
        <StyledFooterNavList>
          <StyledFooterNavListItem>
            <NextLink href="/" passHref>
              <StyledFooterAnchor style={linkStyles}>Home</StyledFooterAnchor>
            </NextLink>
          </StyledFooterNavListItem>
          <StyledFooterNavListItem>
            <NextLink href="/palette" passHref>
              <StyledFooterAnchor style={linkStyles}>Palette</StyledFooterAnchor>
            </NextLink>
          </StyledFooterNavListItem>
          <StyledFooterNavListItem>
            <NextLink href="/about" passHref>
              <StyledFooterAnchor style={linkStyles}>About</StyledFooterAnchor>
            </NextLink>
          </StyledFooterNavListItem>
        </StyledFooterNavList>
      </StyledFooterNav>
    </StyledFooter>
  );
};

export { Footer };
