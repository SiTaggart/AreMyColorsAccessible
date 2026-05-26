import styled from '@emotion/styled';
import React, { ReactNode, ReactElement } from 'react';

interface FormLabelProps {
  children: ReactNode;
  htmlFor: string;
  variant?: 'large' | 'compact' | undefined;
}

interface StyledLabelProps {
  variant?: 'large' | 'compact' | undefined;
}
const getFontSize = (props: StyledLabelProps): string => {
  let fontSize = '';
  switch (props.variant) {
    case 'large': {
      fontSize = '2.5rem';
      break;
    }
    case 'compact': {
      fontSize = '1rem';
      break;
    }
    default: {
      fontSize = '1.2rem';
      break;
    }
  }
  return fontSize;
};
const StyledLabel = styled.label<StyledLabelProps>`
  display: inline-block;
  font-size: ${getFontSize};
  margin-bottom: ${(props: StyledLabelProps): string =>
    props.variant === 'compact' ? '0' : '0.5rem'};
  width: 100%;
`;

const FormLabel: React.FC<FormLabelProps> = ({
  children,
  htmlFor,
  variant,
}: FormLabelProps): ReactElement<HTMLLabelElement> => (
  <StyledLabel htmlFor={htmlFor} variant={variant}>
    {children}
  </StyledLabel>
);

export { FormLabel };
