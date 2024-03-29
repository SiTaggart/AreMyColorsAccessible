/// <reference types="jest" />
import { expect } from '@jest/globals';

import { getRating } from '../get-rating';

describe('getRating', () => {
  test('should return rating with valid colors', () => {
    expect(getRating(['#fff', '#000'])).toEqual({
      bold: 'AAA',
      contrast: '21: 1',
      large: 'AAA',
      overall: 'Yup',
      small: 'AAA',
    });
  });
  test('should handle invalid colors', () => {
    expect(getRating(['#bar', 'foo'])).toEqual(false);
  });
});
