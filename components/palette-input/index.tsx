import React, { FormEvent } from 'react';
import './palette-input.scss';
import FormLabel from '../form-label';
import FormInput from '../form-input';

interface IPaletteInputProps {
  onColorAdd: (colors: string) => void;
  errorMessage?: string;
}

const PaletteInput: React.FunctionComponent<IPaletteInputProps> = (props: IPaletteInputProps) => {
  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
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
          defaultValue="#fff #dedede #5F98E1 #6638F0 #B0F566 #333 #000, #555"
          errorMessage={props.errorMessage}
          hasNoSpacing
          id="palette-form-input"
          name="paletteFormInput"
        />
      </div>
    </form>
  );
};

export default PaletteInput;
