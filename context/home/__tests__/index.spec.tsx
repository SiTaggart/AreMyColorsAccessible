/* eslint-disable react/display-name */

import * as React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { SiteDataProvider, useSiteData, HomeContextInterface } from '..';

describe('useSiteData hook', (): void => {
  it('should set context by default', (): void => {
    const wrapper = ({ children }: { children?: any }): React.ReactElement => (
      <SiteDataProvider>{children}</SiteDataProvider>
    );

    const { result } = renderHook((): HomeContextInterface => useSiteData(), {
      wrapper,
    });
    expect(result.current.siteData).toEqual({
      background: '#1276CE',
      colorCombos: [
        {
          color: [255, 255, 255],
          combinations: [
            {
              accessibility: { aa: true, aaLarge: true, aaa: false, aaaLarge: true },
              color: [18, 118, 206],
              contrast: 4.658_034_537_943_552,
              hex: '#1276CE',
              model: 'rgb',
              valpha: 1,
            },
          ],
          hex: '#FFFFFF',
          model: 'rgb',
          valpha: 1,
        },
        {
          color: [18, 118, 206],
          combinations: [
            {
              accessibility: { aa: true, aaLarge: true, aaa: false, aaaLarge: true },
              color: [255, 255, 255],
              contrast: 4.658_034_537_943_552,
              hex: '#FFFFFF',
              model: 'rgb',
              valpha: 1,
            },
          ],
          hex: '#1276CE',
          model: 'rgb',
          valpha: 1,
        },
      ],
      isLight: false,
      textColor: '#FFFFFF',
    });
  });

  it('should set context when initial siteData is set', (): void => {
    const { result: initialContext } = renderHook((): HomeContextInterface => useSiteData(), {
      wrapper: ({ children }: { children?: any }): React.ReactElement => (
        <SiteDataProvider
          initialSiteData={{
            background: '#111',
            textColor: 'rgb(239,239,239)',
            colorCombos: [],
            isLight: true,
          }}
        >
          {children}
        </SiteDataProvider>
      ),
    });
    expect(initialContext.current.siteData).toEqual({
      background: '#111',
      colorCombos: [
        {
          color: [239, 239, 239],
          combinations: [
            {
              accessibility: { aa: true, aaLarge: true, aaa: true, aaaLarge: true },
              color: [17, 17, 17],
              contrast: 16.422_098_411_346_187,
              hex: '#111111',
              model: 'rgb',
              valpha: 1,
            },
          ],
          hex: '#EFEFEF',
          model: 'rgb',
          valpha: 1,
        },
        {
          color: [17, 17, 17],
          combinations: [
            {
              accessibility: { aa: true, aaLarge: true, aaa: true, aaaLarge: true },
              color: [239, 239, 239],
              contrast: 16.422_098_411_346_187,
              hex: '#EFEFEF',
              model: 'rgb',
              valpha: 1,
            },
          ],
          hex: '#111111',
          model: 'rgb',
          valpha: 1,
        },
      ],
      isLight: true,
      textColor: 'rgb(239,239,239)',
    });
  });

  it('should update siteData when background color is changed', (): void => {
    const wrapper = ({ children }: { children?: any }): React.ReactElement => (
      <SiteDataProvider>{children}</SiteDataProvider>
    );

    const { result } = renderHook((): HomeContextInterface => useSiteData(), {
      wrapper,
    });

    act((): void => {
      result.current.handleBackgroundColorInputChange('#444');
    });

    expect(result.current.siteData).toEqual({
      background: '#444',
      colorCombos: [
        {
          color: [255, 255, 255],
          combinations: [
            {
              accessibility: { aa: true, aaLarge: true, aaa: true, aaaLarge: true },
              color: [68, 68, 68],
              contrast: 9.739_769_120_526_205,
              hex: '#444444',
              model: 'rgb',
              valpha: 1,
            },
          ],
          hex: '#FFFFFF',
          model: 'rgb',
          valpha: 1,
        },
        {
          color: [68, 68, 68],
          combinations: [
            {
              accessibility: { aa: true, aaLarge: true, aaa: true, aaaLarge: true },
              color: [255, 255, 255],
              contrast: 9.739_769_120_526_205,
              hex: '#FFFFFF',
              model: 'rgb',
              valpha: 1,
            },
          ],
          hex: '#444444',
          model: 'rgb',
          valpha: 1,
        },
      ],
      isLight: false,
      textColor: '#FFFFFF',
    });
  });

  it('should update siteData when text color is changed', (): void => {
    const wrapper = ({ children }: { children?: any }): React.ReactElement => (
      <SiteDataProvider>{children}</SiteDataProvider>
    );

    const { result } = renderHook((): HomeContextInterface => useSiteData(), {
      wrapper,
    });
    act((): void => {
      result.current.handleTextColorInputChange('#000');
    });
    expect(result.current.siteData).toEqual({
      background: '#1276CE',
      colorCombos: [
        {
          color: [0, 0, 0],
          combinations: [
            {
              accessibility: { aa: true, aaLarge: true, aaa: false, aaaLarge: true },
              color: [18, 118, 206],
              contrast: 4.508_339_263_897_164,
              hex: '#1276CE',
              model: 'rgb',
              valpha: 1,
            },
          ],
          hex: '#000000',
          model: 'rgb',
          valpha: 1,
        },
        {
          color: [18, 118, 206],
          combinations: [
            {
              accessibility: { aa: true, aaLarge: true, aaa: false, aaaLarge: true },
              color: [0, 0, 0],
              contrast: 4.508_339_263_897_164,
              hex: '#000000',
              model: 'rgb',
              valpha: 1,
            },
          ],
          hex: '#1276CE',
          model: 'rgb',
          valpha: 1,
        },
      ],
      isLight: false,
      textColor: '#000',
    });
  });

  it('should keep current state when invalid colour is set as background color', (): void => {
    const wrapper = ({ children }: { children?: any }): React.ReactElement => (
      <SiteDataProvider>{children}</SiteDataProvider>
    );

    const { result } = renderHook((): HomeContextInterface => useSiteData(), {
      wrapper,
    });
    act((): void => {
      result.current.handleBackgroundColorInputChange('blah');
    });

    expect(result.current.siteData).toEqual({
      background: 'blah',
      colorCombos: [
        {
          color: [255, 255, 255],
          combinations: [
            {
              accessibility: { aa: true, aaLarge: true, aaa: false, aaaLarge: true },
              color: [18, 118, 206],
              contrast: 4.658_034_537_943_552,
              hex: '#1276CE',
              model: 'rgb',
              valpha: 1,
            },
          ],
          hex: '#FFFFFF',
          model: 'rgb',
          valpha: 1,
        },
        {
          color: [18, 118, 206],
          combinations: [
            {
              accessibility: { aa: true, aaLarge: true, aaa: false, aaaLarge: true },
              color: [255, 255, 255],
              contrast: 4.658_034_537_943_552,
              hex: '#FFFFFF',
              model: 'rgb',
              valpha: 1,
            },
          ],
          hex: '#1276CE',
          model: 'rgb',
          valpha: 1,
        },
      ],
      isLight: false,
      textColor: '#FFFFFF',
    });
  });

  it('should keep current state when invalid colour is set as textColor color', (): void => {
    const wrapper = ({ children }: { children?: any }): React.ReactElement => (
      <SiteDataProvider>{children}</SiteDataProvider>
    );

    const { result } = renderHook((): HomeContextInterface => useSiteData(), {
      wrapper,
    });
    act((): void => {
      result.current.handleTextColorInputChange('foo');
    });

    expect(result.current.siteData).toEqual({
      background: '#1276CE',
      colorCombos: [
        {
          color: [255, 255, 255],
          combinations: [
            {
              accessibility: { aa: true, aaLarge: true, aaa: false, aaaLarge: true },
              color: [18, 118, 206],
              contrast: 4.658_034_537_943_552,
              hex: '#1276CE',
              model: 'rgb',
              valpha: 1,
            },
          ],
          hex: '#FFFFFF',
          model: 'rgb',
          valpha: 1,
        },
        {
          color: [18, 118, 206],
          combinations: [
            {
              accessibility: { aa: true, aaLarge: true, aaa: false, aaaLarge: true },
              color: [255, 255, 255],
              contrast: 4.658_034_537_943_552,
              hex: '#FFFFFF',
              model: 'rgb',
              valpha: 1,
            },
          ],
          hex: '#1276CE',
          model: 'rgb',
          valpha: 1,
        },
      ],
      isLight: false,
      textColor: 'foo',
    });
  });

  it('should throw without setting context', (): void => {
    const { result: throwContext } = renderHook((): HomeContextInterface => useSiteData(), {
      wrapper: ({ children }: { children?: any }): React.ReactElement => <div>{children}</div>,
    });

    const mockError = new Error('useSiteData must be used with SiteDataProvider');

    expect(throwContext.error).toEqual(mockError);
  });

  it('should handle a text and background colours being the same', (): void => {
    const { result: sameForeBackContext } = renderHook((): HomeContextInterface => useSiteData(), {
      wrapper: ({ children }: { children?: any }): React.ReactElement => (
        <SiteDataProvider
          initialSiteData={{
            background: '#fff',
            textColor: '#fff',
            colorCombos: [],
            isLight: true,
          }}
        >
          {children}
        </SiteDataProvider>
      ),
    });
    expect(sameForeBackContext.current.siteData).toEqual({
      background: '#fff',
      colorCombos: [
        { color: [255, 255, 255], combinations: [], hex: '#FFFFFF', model: 'rgb', valpha: 1 },
      ],
      isLight: true,
      textColor: '#fff',
    });
  });
});
/* eslint-enable react/display-name */
