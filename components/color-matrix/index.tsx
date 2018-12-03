import React, { Component } from 'react';
import Color from 'color';
import isEqual from 'lodash/isEqual';
import ColorCombos from '../../utils/color-combos';
import { ColorCombosTypes } from '../../types';
import ColorCard from '../color-card';
import HslSlider from '../hsl-slider';
import FormInput from '../form-input';
import './color-matrix.scss';

interface IColorMatrixProps {
  colors: string[];
  onColorChange: (newColors: string[]) => void;
}

interface IColorMatrixState {
  colors: string[];
  colorCombos: Array<ColorCombosTypes>;
}

class ColorMatrix extends Component<IColorMatrixProps, IColorMatrixState> {
  constructor(props: IColorMatrixProps) {
    super(props);
    const colorCombos = ColorCombos(this.props.colors);
    if (colorCombos !== false) {
      this.state = {
        colors: this.props.colors,
        colorCombos: colorCombos
      };
    }
  }

  public componentDidUpdate(prevProps: IColorMatrixProps, prevState: IColorMatrixState) {
    console.group('did update');
    console.log('prev props', prevProps);
    console.log('props', this.props);
    console.log('prevState', prevState);
    console.log('state', this.state);
    console.groupEnd();
    this.updateCombos(this.props.colors);
  }

  public shouldComponentUpdate(
    nextProps: IColorMatrixProps,
    nextState: IColorMatrixState
  ): boolean {
    console.group('should update');
    console.log('prev props', nextProps);
    console.log('props', this.props);
    console.log('prevState', nextState);
    console.log('state', this.state);
    console.groupEnd();
    return !isEqual(this.state, nextState) || !isEqual(this.props, nextProps);
  }

  updateCombos = (colors: string[]) => {
    const colorCombos = ColorCombos(colors);
    if (colorCombos !== false) {
      this.setState({ colorCombos, colors });
    }
  };

  isValidColor = (hex: string): Color | false => {
    let color: Color | false = false;
    try {
      color = Color(hex);
    } catch (error) {}
    return color;
  };

  getNewColorsFromProps = (hex: string, targetIndex: number): string[] => {
    return this.state.colors.map((color, index) => (index === targetIndex ? hex : color));
  };

  handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputTarget = event.currentTarget;
    let newColor: Color | false = this.isValidColor(inputTarget.value);
    let newColors: string[] = [];
    let indexInMatrix: number = 0;
    if (newColor) {
      indexInMatrix = parseInt(inputTarget.id.replace('colorhex-', ''));
      newColors = this.getNewColorsFromProps(newColor.hex(), indexInMatrix);
      this.updateCombos(newColors);
      // this.props.onColorChange(newColors);
    }
  };

  handleSliderChange = (hex: string, id: string) => {
    const indexInMatrix = parseInt(id.replace('hsl-', ''));
    const newColors = this.getNewColorsFromProps(hex, indexInMatrix);
    this.props.onColorChange(newColors);
  };

  render() {
    return (
      <section className="colorMatrix">
        <table className="colorMatrix-table">
          <thead>
            <tr className="colorMatrix-tr">
              <td
                style={{
                  width: '5rem'
                }}
              />
              {this.state.colorCombos.map((color, index) => (
                <th className="colorMatrix-th" key={index} scope="col">
                  <FormInput
                    ariaLabel="hex colour code"
                    id={`colorhex-${index}`}
                    onChange={this.handleOnChange}
                    value={color.hex}
                  />
                  <HslSlider
                    id={`hsl-${index}`}
                    onChange={this.handleSliderChange}
                    value={color.hex}
                    variant="compact"
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {this.state.colorCombos.map((color, index) => (
              <tr className="colorMatrix-tr" key={index}>
                <th className="colorMatrix-th" key={index} scope="row">
                  {color.hex}
                </th>
                {color.combinations.map((combo, comboIndex) => (
                  <React.Fragment key={comboIndex}>
                    {index === comboIndex && <td className="colorMatrix-td">&nbsp;</td>}
                    <td className="colorMatrix-td">
                      <ColorCard
                        accessibility={combo.accessibility}
                        background={combo.hex}
                        color={color.hex}
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
  }
}

export default ColorMatrix;
