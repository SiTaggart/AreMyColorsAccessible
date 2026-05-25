import React, { ReactElement } from 'react';
import { Link } from '@tanstack/react-router';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

interface FooterProps {
  styles?: { footerLinks?: React.CSSProperties };
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
const footerAnchorStyles = css`
  color: currentColor;
  transition: color 400ms ease-in;
`;

const Footer: React.FC<FooterProps> = ({ styles }: FooterProps): ReactElement<HTMLDivElement> => {
  const linkStyles: React.CSSProperties | undefined = styles ? styles.footerLinks : undefined;
  return (
    <StyledFooter>
      <StyledFooterNav>
        <StyledFooterNavList>
          <StyledFooterNavListItem>
            <Link css={footerAnchorStyles} style={linkStyles} to="/">
              Home
            </Link>
          </StyledFooterNavListItem>
          <StyledFooterNavListItem>
            <Link css={footerAnchorStyles} style={linkStyles} to="/palette">
              Palette
            </Link>
          </StyledFooterNavListItem>
          <StyledFooterNavListItem>
            <Link css={footerAnchorStyles} style={linkStyles} to="/api-page">
              API
            </Link>
          </StyledFooterNavListItem>
          <StyledFooterNavListItem>
            <Link css={footerAnchorStyles} style={linkStyles} to="/about">
              About
            </Link>
          </StyledFooterNavListItem>
        </StyledFooterNavList>
      </StyledFooterNav>
    </StyledFooter>
  );
};

export { Footer };
