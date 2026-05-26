export interface Accessibility {
  aa: boolean;
  aaa: boolean;
  aaaLarge: boolean;
  aaLarge: boolean;
}

export interface ColorRating {
  bold: string;
  large: string;
  overall: string;
  small: string;
}

const colorRating = (accessibility: Accessibility): ColorRating => {
  let small: string;
  let bold: string;
  let large: string;
  let overall = 'Nope';

  if (accessibility.aaa) {
    small = 'AAA';
  } else {
    small = accessibility.aa ? 'AA' : 'Fail';
  }

  if (accessibility.aaaLarge) {
    bold = 'AAA';
    large = 'AAA';
  } else {
    bold = accessibility.aaLarge ? 'AA' : 'Fail';
    large = bold;
  }

  if (small === 'AAA' || small === 'AA') {
    overall = 'Yup';
  } else if (small === 'Fail' && large === 'AA') {
    overall = 'Kinda';
  }

  return {
    bold,
    large,
    overall,
    small,
  };
};

export { colorRating };
