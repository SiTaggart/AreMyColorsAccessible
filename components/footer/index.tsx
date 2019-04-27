import React, { ReactElement } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';

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
const StyledFooterAnchor = styled.a`
  transition: color 400ms ease-in;
`;

const Footer: React.FunctionComponent<FooterProps> = (
  props: FooterProps
): ReactElement<HTMLDivElement> => {
  const linkStyles: object | undefined = props.styles ? props.styles.footerLinks : undefined;
  return (
    <StyledFooter>
      <StyledFooterNav>
        <StyledFooterNavList>
          <StyledFooterNavListItem>
            <Link href="/" passHref>
              <StyledFooterAnchor style={linkStyles}>Home</StyledFooterAnchor>
            </Link>
          </StyledFooterNavListItem>
          <StyledFooterNavListItem>
            <Link href="/palette" passHref>
              <StyledFooterAnchor style={linkStyles}>Palette</StyledFooterAnchor>
            </Link>
          </StyledFooterNavListItem>
          <StyledFooterNavListItem>
            <Link href="/about" passHref>
              <StyledFooterAnchor style={linkStyles}>About</StyledFooterAnchor>
            </Link>
          </StyledFooterNavListItem>
        </StyledFooterNavList>
      </StyledFooterNav>
    </StyledFooter>
  );
};

export default Footer;
