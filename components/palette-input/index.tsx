import React, { FormEvent } from 'react';
import './index.scss';

interface IPaletteInputProps {
  onColorAdd: (hex: string[]) => void;
}

const PaletteInput: React.FunctionComponent<IPaletteInputProps> = (props: IPaletteInputProps) => {
  const convertColorValuesToArray = (colors: string): string[] => {
    return colors.split(',');
  };
  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const colorInput: HTMLInputElement = (e.currentTarget as HTMLFormElement).paletteFormInput;
    const colors: string[] = convertColorValuesToArray(colorInput.value);
    props.onColorAdd(colors);
  };
  return (
    <form className="paletteForm" onSubmit={handleFormSubmit}>
      <div className="paletteForm-element">
        <label className="paletteForm-label" htmlFor="palette-form-input">
          Add a color(s)
        </label>
        <input
          className="paletteForm-input"
          defaultValue=""
          id="palette-form-input"
          name="paletteFormInput"
          type="text"
        />
      </div>
    </form>
  );
};

export default PaletteInput;
