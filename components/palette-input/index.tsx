import React, { FormEvent } from 'react';
import './index.scss';

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
        <label className="paletteForm-label" htmlFor="palette-form-input">
          Add a color(s)
        </label>
        <input
          aria-describedby={props.errorMessage ? 'error-message-label' : undefined}
          autoComplete="off"
          className="paletteForm-input"
          defaultValue=""
          id="palette-form-input"
          name="paletteFormInput"
          type="text"
        />
        {props.errorMessage && (
          <div className="paletteForm-error" id="error-message-label">
            {props.errorMessage}
          </div>
        )}
      </div>
    </form>
  );
};

export default PaletteInput;
