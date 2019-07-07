import React, { ReactNode, ReactElement } from 'react';
import styled from '@emotion/styled';

interface FormProps {
  children: ReactNode;
  dataTest: string;
  style?: {};
}

const StyledForm = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 1rem;
  transition: color 400ms ease-out;
`;

const Form: React.FC<FormProps> = (props: FormProps): ReactElement<HTMLDivElement> => {
  return (
    <StyledForm data-test={props.dataTest} style={props.style}>
      {props.children}
    </StyledForm>
  );
};

export default Form;
