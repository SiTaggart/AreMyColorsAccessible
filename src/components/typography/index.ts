import { css, SerializedStyles } from '@emotion/react';
import styled from '@emotion/styled';
import { breakpoint } from '../../styles/utils';

interface HeadingProps {
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'label' | 'div' | 'span';
  children?: React.ReactElement | string | number;
  variant?: '10';
}
const getHeadingStyleVariant = ({ variant }: HeadingProps): SerializedStyles => {
  let variantStyles = css``;
  switch (variant) {
    case '10': {
      variantStyles = css`
        font-size: 2.4rem;
        text-align: center;

        ${breakpoint('small')} {
          font-size: 3rem;
        }
      `;
      break;
    }
    default: {
      variantStyles = css``;
      break;
    }
  }
  return variantStyles;
};
const Heading = styled.h1<HeadingProps>`
  font-weight: 700;
  ${getHeadingStyleVariant};
`;

const P = styled.p``;

const Link = styled.a`
  color: currentColor;
`;

const Blockquote = styled.blockquote`
  margin: 3rem 1rem;

  ${breakpoint('medium')} {
    margin: 3rem -3rem;
  }

  p {
    font-size: 1.4rem;
    font-style: italic;
  }

  cite {
    font-size: 1rem;
    font-style: normal;
  }
`;

export { Heading, P, Link, Blockquote };
