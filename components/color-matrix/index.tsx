import React from 'react';
import Color from 'color';
import './index.scss';

interface IColorMatrixProps {
  colors: Color[];
}

const ColorMatrix: React.FunctionComponent<IColorMatrixProps> = (props: IColorMatrixProps) => {
  return (
    <section className="colorMatrix">
      <table>
        <thead>
          <tr>
            <td />
            {props.colors.map((color, index) => (
              <th key={index} scope="col">
                {color.hex()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.colors.map((color, index) => (
            <tr key={index}>
              <th key={index} scope="row">
                {color.hex()}
              </th>
              {props.colors.map((color, index) => (
                <td key={index} scope="col">
                  {color.hex()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default ColorMatrix;
