import React from 'react';
import { ColorCombosTypes } from '../../types';
import ColorCard from '../color-card';
import HslSlider from '../hsl-slider';
import FormInput from '../form-input';
import './color-matrix.scss';

interface IColorMatrixProps {
  colors: string[];
  colorCombos: Array<ColorCombosTypes>;
}

const ColorMatrix: React.FunctionComponent<IColorMatrixProps> = (props: IColorMatrixProps) => {
  const handleInputChange = () => {};

  const handleSliderChange = () => {};

  return (
    <section className="colorMatrix">
      <table className="colorMatrix-table">
        <thead>
          <tr className="colorMatrix-tr">
            <td style={{ width: '5rem' }} />
            {props.colorCombos.map((color, index) => (
              <th className="colorMatrix-th" key={index} scope="col">
                <FormInput
                  ariaLabel="hex colour code"
                  id={`color-hex-${index}`}
                  onChange={handleInputChange}
                  value={color.hex}
                />
                <HslSlider
                  id={`${index}hsl`}
                  onChange={handleSliderChange}
                  value={color.hex}
                  variant="compact"
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.colorCombos.map((combinations, index) => (
            <tr className="colorMatrix-tr" key={index}>
              <th className="colorMatrix-th" key={index} scope="row">
                {combinations.hex}
              </th>
              {combinations.combinations.map((combo, comboIndex) => (
                <React.Fragment key={comboIndex}>
                  {index === comboIndex && <td className="colorMatrix-td">&nbsp;</td>}
                  <td className="colorMatrix-td">
                    <ColorCard
                      accessibility={combo.accessibility}
                      background={combo.hex}
                      color={combinations.hex}
                      contrast={combo.contrast}
                    />
                  </td>
                </React.Fragment>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default ColorMatrix;
