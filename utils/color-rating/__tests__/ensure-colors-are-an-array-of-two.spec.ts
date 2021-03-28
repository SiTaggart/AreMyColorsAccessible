import { ensureColorsAreAnArrayOfTwo } from '../ensure-colors-are-an-array-of-two';

describe('ensureColorsAreAnArrayOfTwo', () => {
  test('should return false with undefined', () => {
    // @ts-expect-error testing undefined
    expect(ensureColorsAreAnArrayOfTwo()).toEqual(false);
  });

  test('should return false with a string', () => {
    expect(ensureColorsAreAnArrayOfTwo('color')).toEqual(false);
  });

  test('should return false with an object as an string', () => {
    expect(ensureColorsAreAnArrayOfTwo('{"black": "#000", "white": "#000"}')).toEqual(false);
  });

  test('should handle an array', () => {
    expect(ensureColorsAreAnArrayOfTwo(['foo', 'bar'])).toEqual(['foo', 'bar']);
  });

  test('should return false with an array of one', () => {
    expect(ensureColorsAreAnArrayOfTwo(['foo'])).toEqual(false);
  });

  test('should return false with an array of more than 2', () => {
    expect(ensureColorsAreAnArrayOfTwo(['foo', 'bar', 'baz'])).toEqual(false);
  });

  test('should convert string array to array', () => {
    expect(ensureColorsAreAnArrayOfTwo('["whizz", "whazz"]')).toEqual(['whizz', 'whazz']);
  });
});
