import React, { ReactElement } from "react";
import styled from "@emotion/styled";
import { Link } from "../typography";

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
const StyledFooterAnchor = styled(Link)`
  transition: color 400ms ease-in;
`;

const Footer: React.FC<FooterProps> = ({ styles }: FooterProps): ReactElement<HTMLDivElement> => {
  const linkStyles: React.CSSProperties | undefined = styles ? styles.footerLinks : undefined;
  return (
    <StyledFooter>
      <StyledFooterNav>
        <StyledFooterNavList>
          <StyledFooterNavListItem>
            <StyledFooterAnchor href="/" style={linkStyles}>
              Home
            </StyledFooterAnchor>
          </StyledFooterNavListItem>
          <StyledFooterNavListItem>
            <StyledFooterAnchor href="/palette" style={linkStyles}>
              Palette
            </StyledFooterAnchor>
          </StyledFooterNavListItem>
          <StyledFooterNavListItem>
            <StyledFooterAnchor href="/api-page" style={linkStyles}>
              API
            </StyledFooterAnchor>
          </StyledFooterNavListItem>
          <StyledFooterNavListItem>
            <StyledFooterAnchor href="/about" style={linkStyles}>
              About
            </StyledFooterAnchor>
          </StyledFooterNavListItem>
        </StyledFooterNavList>
      </StyledFooterNav>
    </StyledFooter>
  );
};

export { Footer };
