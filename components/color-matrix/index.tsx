import React from 'react';
import { ColorCombosTypes } from '../../types';
import ColorCard from '../color-card';
import FormInput from '../form-input';
import HslSlider from '../hsl-slider';
import './color-matrix.scss';

export interface IColorMatrixProps {
  colors: string[];
  colorCombos: Array<ColorCombosTypes>;
  onColorChange: (newColor: string, index: number) => void;
}

const ColorMatrix: React.FunctionComponent<IColorMatrixProps> = (props: IColorMatrixProps) => {
  return (
    <section className="colorMatrix">
      <table className="colorMatrix-table">
        <thead>
          <tr className="colorMatrix-tr">
            <td
              style={{
                width: '6rem'
              }}
            />
            {props.colorCombos.map((color, index) => (
              <th className="colorMatrix-th" key={index} scope="col">
                <FormInput
                  ariaLabel="hex colour code"
                  id={`colorhex-${index}`}
                  onChange={e => props.onColorChange(e.target.value, index)}
                  value={props.colors[index]}
                />
                <HslSlider
                  id={`hsl-${index}`}
                  onChange={hex => props.onColorChange(hex, index)}
                  value={color.hex}
                  variant="compact"
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.colorCombos.map((color, index) => (
            <tr className="colorMatrix-tr" key={index}>
              <th className="colorMatrix-th" key={index} scope="row">
                {color.hex}
              </th>
              {color.combinations.map((combo, comboIndex) => (
                <React.Fragment key={comboIndex}>
                  {index === comboIndex && <td className="colorMatrix-td">&nbsp;</td>}
                  <td className="colorMatrix-td">
                    <ColorCard
                      accessibility={combo.accessibility!}
                      background={combo.hex!}
                      color={color.hex}
                      contrast={combo.contrast!}
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
