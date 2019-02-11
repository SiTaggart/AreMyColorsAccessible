import React, { FormEvent, ReactElement } from 'react';
import './palette-input.scss';
import FormInput from '../form-input';
import FormLabel from '../form-label';

interface PaletteInputProps {
  onColorAdd: (colors: string) => void;
  errorMessage?: string;
}

const PaletteInput: React.FunctionComponent<PaletteInputProps> = (
  props: PaletteInputProps
): ReactElement<HTMLFormElement> => {
  const handleFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const colorInput: HTMLInputElement = (e.target as HTMLFormElement).paletteFormInput;
    props.onColorAdd(colorInput.value);
  };

  return (
    <form className="paletteForm" onSubmit={handleFormSubmit}>
      <div className="paletteForm-element">
        <h1 className="paletteForm-heading">
          <FormLabel htmlFor="palette-form-input" isLarge>
            Add the colours from your palette
          </FormLabel>
        </h1>
        <FormInput
          errorMessage={props.errorMessage}
          hasNoSpacing
          id="palette-form-input"
          name="paletteFormInput"
          placeholder="e.g. #ccc, #fff or blue"
        />
      </div>
    </form>
  );
};

export default PaletteInput;
