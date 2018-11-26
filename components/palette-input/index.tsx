import React, { FormEvent } from 'react';
import './index.scss';
import FormLabel from '../form-label';
import FormInput from '../form-input';

interface IPaletteInputProps {
  onColorAdd: (colors: string) => void;
  errorMessage?: string;
}

const PaletteInput: React.FunctionComponent<IPaletteInputProps> = (props: IPaletteInputProps) => {
  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const colorInput: HTMLInputElement = (e.currentTarget as HTMLFormElement).paletteFormInput;
    props.onColorAdd(colorInput.value);
  };

  return (
    <form className="paletteForm" onSubmit={handleFormSubmit}>
      <div className="paletteForm-element">
        <h1>
          <FormLabel className="paletteForm-label" htmlFor="palette-form-input">
            Add the colours from your palette
          </FormLabel>
        </h1>
        <FormInput
          className="paletteForm-input"
          defaultValue="#fff #dedede #5F98E1 #6638F0 #B0F566 #333 #000, #555"
          errorMessage={props.errorMessage}
          id="palette-form-input"
          name="paletteFormInput"
        />
      </div>
    </form>
  );
};

export default PaletteInput;
