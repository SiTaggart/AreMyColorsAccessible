import React from 'react';
import ClassNames from 'classnames';
import { Levels } from '../../types';
import colorRating from '../../utils/color-rating';
import './color-card.scss';

interface IColorCardProps {
  accessibility: Levels;
  background: string;
  color: string;
  contrast: number;
}

const ColorCard: React.FunctionComponent<IColorCardProps> = (props: IColorCardProps) => {
  const rating = colorRating(props.accessibility);

  return (
    <div
      className={ClassNames('colorCard', {
        'colorCard--nope': rating.overall === 'Nope'
      })}
    >
      <div
        className="colorCard-swatch"
        style={{ backgroundColor: props.background, color: props.color }}
      >
        {rating.overall}
      </div>
      <div className="colorCard-ratio">
        <div>Small text: {rating.small}</div>
        <div>Large text: {rating.large}</div>
        <div>Contrast: {parseFloat(props.contrast.toFixed(2))}</div>
      </div>
    </div>
  );
};

export default ColorCard;
