import React, { FormEvent, ReactElement } from 'react';
import styled from '@emotion/styled';
import { FormInput } from '../form-input';
import { FormLabel } from '../form-label';
import { Heading } from '../typography';

const StyledPaletteForm = styled.form`
  text-align: center;
`;

const StyledPaletteFormHeading = styled(Heading)`
  line-height: 1;
  margin: 3rem 0;
`;

interface PaletteInputProps {
  onColorAdd: (colors: string) => void;
  errorMessage?: string;
}

const PaletteInput: React.FC<PaletteInputProps> = ({
  errorMessage,
  ...props
}: PaletteInputProps): ReactElement<HTMLFormElement> => {
  const handleFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const colorInput: HTMLInputElement = (e.target as HTMLFormElement).paletteFormInput;
    props.onColorAdd(colorInput.value);
  };

  return (
    <StyledPaletteForm onSubmit={handleFormSubmit}>
      <div>
        <StyledPaletteFormHeading as="h1">
          <FormLabel htmlFor="palette-form-input" variant="large">
            Add the colours from your palette
          </FormLabel>
        </StyledPaletteFormHeading>
        <FormInput
          errorMessage={errorMessage}
          hasNoSpacing
          id="palette-form-input"
          name="paletteFormInput"
          placeholder="e.g. #ccc, #fff or blue"
        />
      </div>
    </StyledPaletteForm>
  );
};

export { PaletteInput };
