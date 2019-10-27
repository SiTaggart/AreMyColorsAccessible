import React, { ReactNode, ReactElement } from 'react';
import styled from '@emotion/styled';
import { breakpoint } from '../../styles/utils';

interface FormControlProps {
  children: ReactNode;
}

const StyleFormControl = styled.div`
  padding: 1rem;
  width: 100%;
  ${breakpoint('small')} {
    flex: 1 1 auto;
    width: 50%;
  }
`;

const FormControl: React.FC<FormControlProps> = ({
  children,
}: FormControlProps): ReactElement<HTMLDivElement> => (
  <StyleFormControl>{children}</StyleFormControl>
);

export default FormControl;
