import React, { ReactElement, ReactNode } from 'react';
import styled from '@emotion/styled';
import { css, SerializedStyles } from '@emotion/core';

interface LayoutProps {
  children?: ReactNode;
  variant?: 'large' | 'small' | 'full';
}

const variantSize = ({ variant }: LayoutProps): SerializedStyles => {
  let styles = css``;
  switch (variant) {
    case 'full':
      styles = css`
        max-width: 95%;
      `;
      break;
    case 'large':
      styles = css`
        max-width: 1200px;
      `;
      break;
    case 'small':
      styles = css`
        max-width: 1150px;
        padding: 0 1rem;
      `;
      break;
    default:
      break;
  }
  return styles;
};
const StyledLayout = styled.div<LayoutProps>`
  margin: 0 auto;
  ${variantSize}
`;

const Layout: React.FC<LayoutProps> = (props: LayoutProps): ReactElement<HTMLDivElement> => (
  <StyledLayout {...props}>{props.children}</StyledLayout>
);

export default Layout;
