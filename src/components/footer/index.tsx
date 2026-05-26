import React, { ReactElement } from "react";
import styled from "@emotion/styled";
import { Link } from "@tanstack/react-router";

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
const StyledFooterLink = styled(Link)`
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
            <StyledFooterLink style={linkStyles} to="/">
              Home
            </StyledFooterLink>
          </StyledFooterNavListItem>
          <StyledFooterNavListItem>
            <StyledFooterLink style={linkStyles} to="/palette">
              Palette
            </StyledFooterLink>
          </StyledFooterNavListItem>
          <StyledFooterNavListItem>
            <StyledFooterLink style={linkStyles} to="/api-page">
              API
            </StyledFooterLink>
          </StyledFooterNavListItem>
          <StyledFooterNavListItem>
            <StyledFooterLink style={linkStyles} to="/about">
              About
            </StyledFooterLink>
          </StyledFooterNavListItem>
        </StyledFooterNavList>
      </StyledFooterNav>
    </StyledFooter>
  );
};

export { Footer };
