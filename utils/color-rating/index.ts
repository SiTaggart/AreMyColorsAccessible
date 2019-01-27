interface IAccessibility {
  aaa: boolean;
  aa: boolean;
  aaaLarge: boolean;
  aaLarge: boolean;
}

interface IColorRating {
  small: string;
  bold: string;
  large: string;
  overall: string;
}

const colorRating = (accessibility: IAccessibility): IColorRating => {
  let small: string;
  let bold: string;
  let large: string;
  let overall: string = 'Nope';

  if (accessibility.aaa) {
    small = 'AAA';
  } else {
    small = accessibility.aa ? 'AA' : 'Fail';
  }

  if (accessibility.aaaLarge) {
    bold = large = 'AAA';
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
    small,
    bold,
    large,
    overall
  };
};

export default colorRating;
