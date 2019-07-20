import React, { ReactElement } from 'react';
import Form from '../form';
import FormControl from '../form-control';
import FormInput from '../form-input';
import FormLabel from '../form-label';
import HslSliders from '../hsl-sliders';
import { useSiteData } from '../../context/home';

const ColorInputs: React.FC<{}> = (): ReactElement => {
  const {
    siteData: { background, colorCombos, isLight, textColor },
    handleTextColorInputChange,
    handleBackgroundColorInputChange
  } = useSiteData();

  const formTextColor = isLight ? '#343334' : '#fff';
  const styles = {
    form: {
      color: formTextColor
    },
    input: {
      borderColor: formTextColor,
      color: 'inherit'
    }
  };

  return (
    <Form dataTest="color-input-form" style={styles.form}>
      <FormControl>
        <FormLabel htmlFor="textColor">Text Color</FormLabel>
        <FormInput
          id="textColor"
          onChange={(e): void => handleTextColorInputChange(e.target.value)}
          style={styles.input}
          value={textColor}
        />
        <HslSliders
          id="textColor-hsl"
          onChange={handleTextColorInputChange}
          value={colorCombos[0].hex}
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="background">Background</FormLabel>
        <FormInput
          id="background"
          onChange={(e): void => handleBackgroundColorInputChange(e.target.value)}
          style={styles.input}
          value={background}
        />
        <HslSliders
          id="background-hsl"
          onChange={handleBackgroundColorInputChange}
          value={colorCombos[1].hex}
        />
      </FormControl>
    </Form>
  );
};

export default ColorInputs;
