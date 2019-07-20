import React, { ReactNode, ReactElement } from 'react';
import styled from '@emotion/styled';
import { breakpoint } from '../../styles/utils';

interface FormControlProps {
  children: ReactNode;
}

const StyleFormControl = styled.div`
  padding: 1rem;
  ${breakpoint('small')} {
    flex: 1 1 auto;
    width: 50%;
  }
`;

const FormControl: React.FC<FormControlProps> = (
  props: FormControlProps
): ReactElement<HTMLDivElement> => {
  return <StyleFormControl>{props.children}</StyleFormControl>;
};

export default FormControl;
