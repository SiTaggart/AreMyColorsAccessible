/* eslint-env jest */
/* eslint-disable react/display-name */
/// <reference types="jest" />
import { expect } from '@jest/globals';

import * as React from 'react';
import { renderHook, act, RenderHookResult } from '@testing-library/react-hooks';
import { PaletteDataProvider, usePaletteData, PaletteContextProps } from '..';

describe('useSiteData hook', (): void => {
  const wrapper = ({ children }: { children?: any }): React.ReactElement => (
    <PaletteDataProvider>{children}</PaletteDataProvider>
  );

  let renderedHook: RenderHookResult<{ children?: any }, PaletteContextProps>;

  beforeEach((): void => {
    renderedHook = renderHook(() => usePaletteData(), {
      wrapper,
    });
  });

  it('should set context by default', (): void => {
    expect(renderedHook.result.current.paletteData).toEqual({
      colorCombos: [],
      colors: [],
      hasError: false,
    });
  });

  it('should add a new colour', (): void => {
    act((): void => {
      renderedHook.result.current.handleNewColor('red');
    });
    expect(renderedHook.result.current.paletteData).toEqual({
      colorCombos: [
        { color: [255, 0, 0], combinations: [], hex: '#FF0000', model: 'rgb', valpha: 1 },
      ],
      colors: ['red'],
      hasError: false,
    });
  });

  it('should add multiple colours', (): void => {
    act((): void => {
      renderedHook.result.current.handleNewColor('red, blue, green');
    });
    expect(renderedHook.result.current.paletteData).toEqual({
      colorCombos: [
        {
          color: [255, 0, 0],
          combinations: [
            {
              accessibility: { aa: false, aaLarge: false, aaa: false, aaaLarge: false },
              color: [0, 0, 255],
              contrast: 2.148_936_170_212_766,
              hex: '#0000FF',
              model: 'rgb',
              valpha: 1,
            },
            {
              accessibility: { aa: false, aaLarge: false, aaa: false, aaaLarge: false },
              color: [0, 128, 0],
              contrast: 1.284_839_971_661_46,
              hex: '#008000',
              model: 'rgb',
              valpha: 1,
            },
          ],
          hex: '#FF0000',
          model: 'rgb',
          valpha: 1,
        },
        {
          color: [0, 0, 255],
          combinations: [
            {
              accessibility: { aa: false, aaLarge: false, aaa: false, aaaLarge: false },
              color: [255, 0, 0],
              contrast: 2.148_936_170_212_766,
              hex: '#FF0000',
              model: 'rgb',
              valpha: 1,
            },
            {
              accessibility: { aa: false, aaLarge: false, aaa: false, aaaLarge: false },
              color: [0, 128, 0],
              contrast: 1.672_532_157_786_094_3,
              hex: '#008000',
              model: 'rgb',
              valpha: 1,
            },
          ],
          hex: '#0000FF',
          model: 'rgb',
          valpha: 1,
        },
        {
          color: [0, 128, 0],
          combinations: [
            {
              accessibility: { aa: false, aaLarge: false, aaa: false, aaaLarge: false },
              color: [255, 0, 0],
              contrast: 1.284_839_971_661_46,
              hex: '#FF0000',
              model: 'rgb',
              valpha: 1,
            },
            {
              accessibility: { aa: false, aaLarge: false, aaa: false, aaaLarge: false },
              color: [0, 0, 255],
              contrast: 1.672_532_157_786_094_3,
              hex: '#0000FF',
              model: 'rgb',
              valpha: 1,
            },
          ],
          hex: '#008000',
          model: 'rgb',
          valpha: 1,
        },
      ],
      colors: ['red', 'blue', 'green'],
      hasError: false,
    });
  });

  it('should handle commas and space separated colours', (): void => {
    act((): void => {
      renderedHook.result.current.handleNewColor('purple pink, orange');
    });
    expect(renderedHook.result.current.paletteData).toEqual({
      colorCombos: [
        {
          color: [128, 0, 128],
          combinations: [
            {
              accessibility: { aa: true, aaLarge: true, aaa: false, aaaLarge: true },
              color: [255, 192, 203],
              contrast: 6.124_225_406_859_997,
              hex: '#FFC0CB',
              model: 'rgb',
              valpha: 1,
            },
            {
              accessibility: { aa: true, aaLarge: true, aaa: false, aaaLarge: true },
              color: [255, 165, 0],
              contrast: 4.769_614_668_743_367,
              hex: '#FFA500',
              model: 'rgb',
              valpha: 1,
            },
          ],
          hex: '#800080',
          model: 'rgb',
          valpha: 1,
        },
        {
          color: [255, 192, 203],
          combinations: [
            {
              accessibility: { aa: true, aaLarge: true, aaa: false, aaaLarge: true },
              color: [128, 0, 128],
              contrast: 6.124_225_406_859_997,
              hex: '#800080',
              model: 'rgb',
              valpha: 1,
            },
            {
              accessibility: { aa: false, aaLarge: false, aaa: false, aaaLarge: false },
              color: [255, 165, 0],
              contrast: 1.284_008_422_523_894_1,
              hex: '#FFA500',
              model: 'rgb',
              valpha: 1,
            },
          ],
          hex: '#FFC0CB',
          model: 'rgb',
          valpha: 1,
        },
        {
          color: [255, 165, 0],
          combinations: [
            {
              accessibility: { aa: true, aaLarge: true, aaa: false, aaaLarge: true },
              color: [128, 0, 128],
              contrast: 4.769_614_668_743_367,
              hex: '#800080',
              model: 'rgb',
              valpha: 1,
            },
            {
              accessibility: { aa: false, aaLarge: false, aaa: false, aaaLarge: false },
              color: [255, 192, 203],
              contrast: 1.284_008_422_523_894_1,
              hex: '#FFC0CB',
              model: 'rgb',
              valpha: 1,
            },
          ],
          hex: '#FFA500',
          model: 'rgb',
          valpha: 1,
        },
      ],
      colors: ['purple', 'pink', 'orange'],
      hasError: false,
    });
  });

  it('should handle hex', (): void => {
    act((): void => {
      renderedHook.result.current.handleNewColor('#fff #000');
    });
    expect(renderedHook.result.current.paletteData).toEqual({
      colorCombos: [
        {
          color: [255, 255, 255],
          combinations: [
            {
              accessibility: { aa: true, aaLarge: true, aaa: true, aaaLarge: true },
              color: [0, 0, 0],
              contrast: 21,
              hex: '#000000',
              model: 'rgb',
              valpha: 1,
            },
          ],
          hex: '#FFFFFF',
          model: 'rgb',
          valpha: 1,
        },
        {
          color: [0, 0, 0],
          combinations: [
            {
              accessibility: { aa: true, aaLarge: true, aaa: true, aaaLarge: true },
              color: [255, 255, 255],
              contrast: 21,
              hex: '#FFFFFF',
              model: 'rgb',
              valpha: 1,
            },
          ],
          hex: '#000000',
          model: 'rgb',
          valpha: 1,
        },
      ],
      colors: ['#fff', '#000'],
      hasError: false,
    });
  });

  it('should handle a mix of hex and named colours', (): void => {
    act((): void => {
      renderedHook.result.current.handleNewColor('#fff, red');
    });
    expect(renderedHook.result.current.paletteData).toEqual({
      colorCombos: [
        {
          color: [255, 255, 255],
          combinations: [
            {
              accessibility: { aa: false, aaLarge: true, aaa: false, aaaLarge: false },
              color: [255, 0, 0],
              contrast: 3.998_476_770_753_998_5,
              hex: '#FF0000',
              model: 'rgb',
              valpha: 1,
            },
          ],
          hex: '#FFFFFF',
          model: 'rgb',
          valpha: 1,
        },
        {
          color: [255, 0, 0],
          combinations: [
            {
              accessibility: { aa: false, aaLarge: true, aaa: false, aaaLarge: false },
              color: [255, 255, 255],
              contrast: 3.998_476_770_753_998_5,
              hex: '#FFFFFF',
              model: 'rgb',
              valpha: 1,
            },
          ],
          hex: '#FF0000',
          model: 'rgb',
          valpha: 1,
        },
      ],
      colors: ['#fff', 'red'],
      hasError: false,
    });
  });

  it('should handle duplicates', (): void => {
    act((): void => {
      renderedHook.result.current.handleNewColor('#fff, white #000');
    });
    expect(renderedHook.result.current.paletteData).toEqual({
      colorCombos: [
        {
          color: [255, 255, 255],
          combinations: [
            {
              accessibility: { aa: false, aaLarge: false, aaa: false, aaaLarge: false },
              color: [255, 255, 255],
              contrast: 1,
              hex: '#FFFFFF',
              model: 'rgb',
              valpha: 1,
            },
            {
              accessibility: { aa: true, aaLarge: true, aaa: true, aaaLarge: true },
              color: [0, 0, 0],
              contrast: 21,
              hex: '#000000',
              model: 'rgb',
              valpha: 1,
            },
          ],
          hex: '#FFFFFF',
          model: 'rgb',
          valpha: 1,
        },
        {
          color: [255, 255, 255],
          combinations: [
            {
              accessibility: { aa: false, aaLarge: false, aaa: false, aaaLarge: false },
              color: [255, 255, 255],
              contrast: 1,
              hex: '#FFFFFF',
              model: 'rgb',
              valpha: 1,
            },
            {
              accessibility: { aa: true, aaLarge: true, aaa: true, aaaLarge: true },
              color: [0, 0, 0],
              contrast: 21,
              hex: '#000000',
              model: 'rgb',
              valpha: 1,
            },
          ],
          hex: '#FFFFFF',
          model: 'rgb',
          valpha: 1,
        },
        {
          color: [0, 0, 0],
          combinations: [
            {
              accessibility: { aa: true, aaLarge: true, aaa: true, aaaLarge: true },
              color: [255, 255, 255],
              contrast: 21,
              hex: '#FFFFFF',
              model: 'rgb',
              valpha: 1,
            },
            {
              accessibility: { aa: true, aaLarge: true, aaa: true, aaaLarge: true },
              color: [255, 255, 255],
              contrast: 21,
              hex: '#FFFFFF',
              model: 'rgb',
              valpha: 1,
            },
          ],
          hex: '#000000',
          model: 'rgb',
          valpha: 1,
        },
      ],
      colors: ['#fff', 'white', '#000'],
      hasError: false,
    });
  });

  it('should handle invalid colours', (): void => {
    act((): void => {
      renderedHook.result.current.handleNewColor('red blackness');
    });
    expect(renderedHook.result.current.paletteData).toEqual({
      colorCombos: [],
      colors: [],
      hasError: true,
    });
  });

  it('should handle a color change on first colour', (): void => {
    act((): void => {
      renderedHook.result.current.handleNewColor('orange, blue purple');
    });
    act((): void => {
      renderedHook.result.current.handleColorChange('red', 0);
    });
    expect(renderedHook.result.current.paletteData).toEqual({
      colorCombos: [
        {
          color: [255, 0, 0],
          combinations: [
            {
              accessibility: { aa: false, aaLarge: false, aaa: false, aaaLarge: false },
              color: [0, 0, 255],
              contrast: 2.148_936_170_212_766,
              hex: '#0000FF',
              model: 'rgb',
              valpha: 1,
            },
            {
              accessibility: { aa: false, aaLarge: false, aaa: false, aaaLarge: false },
              color: [128, 0, 128],
              contrast: 2.355_641_379_714_500_6,
              hex: '#800080',
              model: 'rgb',
              valpha: 1,
            },
          ],
          hex: '#FF0000',
          model: 'rgb',
          valpha: 1,
        },
        {
          color: [0, 0, 255],
          combinations: [
            {
              accessibility: { aa: false, aaLarge: false, aaa: false, aaaLarge: false },
              color: [255, 0, 0],
              contrast: 2.148_936_170_212_766,
              hex: '#FF0000',
              model: 'rgb',
              valpha: 1,
            },
            {
              accessibility: { aa: false, aaLarge: false, aaa: false, aaaLarge: false },
              color: [128, 0, 128],
              contrast: 1.096_189_552_936_450_7,
              hex: '#800080',
              model: 'rgb',
              valpha: 1,
            },
          ],
          hex: '#0000FF',
          model: 'rgb',
          valpha: 1,
        },
        {
          color: [128, 0, 128],
          combinations: [
            {
              accessibility: { aa: false, aaLarge: false, aaa: false, aaaLarge: false },
              color: [255, 0, 0],
              contrast: 2.355_641_379_714_500_6,
              hex: '#FF0000',
              model: 'rgb',
              valpha: 1,
            },
            {
              accessibility: { aa: false, aaLarge: false, aaa: false, aaaLarge: false },
              color: [0, 0, 255],
              contrast: 1.096_189_552_936_450_7,
              hex: '#0000FF',
              model: 'rgb',
              valpha: 1,
            },
          ],
          hex: '#800080',
          model: 'rgb',
          valpha: 1,
        },
      ],
      colors: ['red', 'blue', 'purple'],
      hasError: false,
    });
  });

  it('should handle a color change on the second colour', (): void => {
    act((): void => {
      renderedHook.result.current.handleNewColor('orange, blue purple');
    });
    act((): void => {
      renderedHook.result.current.handleColorChange('red', 1);
    });
    expect(renderedHook.result.current.paletteData).toEqual({
      colorCombos: [
        {
          color: [255, 165, 0],
          combinations: [
            {
              accessibility: { aa: false, aaLarge: false, aaa: false, aaaLarge: false },
              color: [255, 0, 0],
              contrast: 2.024_762_644_185_438_7,
              hex: '#FF0000',
              model: 'rgb',
              valpha: 1,
            },
            {
              accessibility: { aa: true, aaLarge: true, aaa: false, aaaLarge: true },
              color: [128, 0, 128],
              contrast: 4.769_614_668_743_367,
              hex: '#800080',
              model: 'rgb',
              valpha: 1,
            },
          ],
          hex: '#FFA500',
          model: 'rgb',
          valpha: 1,
        },
        {
          color: [255, 0, 0],
          combinations: [
            {
              accessibility: { aa: false, aaLarge: false, aaa: false, aaaLarge: false },
              color: [255, 165, 0],
              contrast: 2.024_762_644_185_438_7,
              hex: '#FFA500',
              model: 'rgb',
              valpha: 1,
            },
            {
              accessibility: { aa: false, aaLarge: false, aaa: false, aaaLarge: false },
              color: [128, 0, 128],
              contrast: 2.355_641_379_714_500_6,
              hex: '#800080',
              model: 'rgb',
              valpha: 1,
            },
          ],
          hex: '#FF0000',
          model: 'rgb',
          valpha: 1,
        },
        {
          color: [128, 0, 128],
          combinations: [
            {
              accessibility: { aa: true, aaLarge: true, aaa: false, aaaLarge: true },
              color: [255, 165, 0],
              contrast: 4.769_614_668_743_367,
              hex: '#FFA500',
              model: 'rgb',
              valpha: 1,
            },
            {
              accessibility: { aa: false, aaLarge: false, aaa: false, aaaLarge: false },
              color: [255, 0, 0],
              contrast: 2.355_641_379_714_500_6,
              hex: '#FF0000',
              model: 'rgb',
              valpha: 1,
            },
          ],
          hex: '#800080',
          model: 'rgb',
          valpha: 1,
        },
      ],
      colors: ['orange', 'red', 'purple'],
      hasError: false,
    });
  });

  it('should handle a color change on any colour', (): void => {
    act((): void => {
      renderedHook.result.current.handleNewColor('orange, blue purple');
    });
    act((): void => {
      renderedHook.result.current.handleColorChange('red', 2);
    });
    expect(renderedHook.result.current.paletteData).toEqual({
      colorCombos: [
        {
          color: [255, 165, 0],
          combinations: [
            {
              accessibility: { aa: false, aaLarge: true, aaa: false, aaaLarge: false },
              color: [0, 0, 255],
              contrast: 4.351_085_682_185_73,
              hex: '#0000FF',
              model: 'rgb',
              valpha: 1,
            },
            {
              accessibility: { aa: false, aaLarge: false, aaa: false, aaaLarge: false },
              color: [255, 0, 0],
              contrast: 2.024_762_644_185_438_7,
              hex: '#FF0000',
              model: 'rgb',
              valpha: 1,
            },
          ],
          hex: '#FFA500',
          model: 'rgb',
          valpha: 1,
        },
        {
          color: [0, 0, 255],
          combinations: [
            {
              accessibility: { aa: false, aaLarge: true, aaa: false, aaaLarge: false },
              color: [255, 165, 0],
              contrast: 4.351_085_682_185_73,
              hex: '#FFA500',
              model: 'rgb',
              valpha: 1,
            },
            {
              accessibility: { aa: false, aaLarge: false, aaa: false, aaaLarge: false },
              color: [255, 0, 0],
              contrast: 2.148_936_170_212_766,
              hex: '#FF0000',
              model: 'rgb',
              valpha: 1,
            },
          ],
          hex: '#0000FF',
          model: 'rgb',
          valpha: 1,
        },
        {
          color: [255, 0, 0],
          combinations: [
            {
              accessibility: { aa: false, aaLarge: false, aaa: false, aaaLarge: false },
              color: [255, 165, 0],
              contrast: 2.024_762_644_185_438_7,
              hex: '#FFA500',
              model: 'rgb',
              valpha: 1,
            },
            {
              accessibility: { aa: false, aaLarge: false, aaa: false, aaaLarge: false },
              color: [0, 0, 255],
              contrast: 2.148_936_170_212_766,
              hex: '#0000FF',
              model: 'rgb',
              valpha: 1,
            },
          ],
          hex: '#FF0000',
          model: 'rgb',
          valpha: 1,
        },
      ],
      colors: ['orange', 'blue', 'red'],
      hasError: false,
    });
  });

  it('should handle adding an invalid colour after colours have been added', (): void => {
    act((): void => {
      renderedHook.result.current.handleNewColor('red black');
    });

    const coloursCombos = renderedHook.result.current.paletteData.colorCombos;

    act((): void => {
      renderedHook.result.current.handleNewColor('blackness');
    });
    expect(renderedHook.result.current.paletteData.colorCombos).toEqual(coloursCombos);
    expect(renderedHook.result.current.paletteData.hasError).toBeTruthy();
  });

  it('should throw without setting context', (): void => {
    const { result } = renderHook((): PaletteContextProps => usePaletteData(), {
      wrapper: ({ children }: { children?: any }): React.ReactElement => <div>{children}</div>,
    });

    const mockError = new Error('usePaletteData must be used with PaletteDataProvider');

    expect(result.error).toEqual(mockError);
  });
});
/* eslint-enable react/display-name */
