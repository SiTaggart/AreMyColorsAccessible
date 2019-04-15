/* eslint-env jest */

import React, { ReactElement } from 'react';
import ReactDOM from 'react-dom';
import { shallow, ShallowWrapper } from 'enzyme';
import AppContainer from '..';
import { HomeProps } from '../../../home'; // eslint-disable-line no-unused-vars

describe('AppContainer', (): void => {
  let ChildComponent: React.FunctionComponent<HomeProps> = (): ReactElement<HTMLDivElement> => {
    return <div />;
  };
  let wrapper: ShallowWrapper;
  let instance: AppContainer;

  beforeAll(
    (): void => {
      ChildComponent = function ChildComponent(): JSX.Element {
        return <div />;
      };
    }
  );

  beforeEach(
    (): void => {
      wrapper = shallow(
        <AppContainer title="are my colors accessible">
          {(props): ReactElement => <ChildComponent {...props} />}
        </AppContainer>
      );

      instance = wrapper.instance() as AppContainer;
    }
  );

  it('renders without crashing', (): void => {
    ReactDOM.render(
      <AppContainer title="are my colors accessible">
        {(props): ReactElement => <ChildComponent {...props} />}
      </AppContainer>,
      document.createElement('div')
    );
  });

  it('should clone children with props', (): void => {
    expect(wrapper.find('ChildComponent').getElement().props.siteData).toEqual({
      background: '#1276CE',
      colorCombos: [
        {
          color: [255, 255, 255],
          combinations: [
            {
              accessibility: { aa: true, aaLarge: true, aaa: false, aaaLarge: true },
              color: [18, 118, 206],
              contrast: 4.658034537943552,
              hex: '#1276CE',
              model: 'rgb',
              valpha: 1
            }
          ],
          hex: '#FFFFFF',
          model: 'rgb',
          valpha: 1
        },
        {
          color: [18, 118, 206],
          combinations: [
            {
              accessibility: { aa: true, aaLarge: true, aaa: false, aaaLarge: true },
              color: [255, 255, 255],
              contrast: 4.658034537943552,
              hex: '#FFFFFF',
              model: 'rgb',
              valpha: 1
            }
          ],
          hex: '#1276CE',
          model: 'rgb',
          valpha: 1
        }
      ],
      isLight: false,
      textColor: '#FFFFFF'
    });
    expect(
      typeof wrapper.find('ChildComponent').getElement().props.handleBackgroundColorInputChange
    ).toBe('function');
    expect(
      typeof wrapper.find('ChildComponent').getElement().props.handleBackgroundColorSliderChange
    ).toBe('function');
    expect(
      typeof wrapper.find('ChildComponent').getElement().props.handleTextColorInputChange
    ).toBe('function');
    expect(
      typeof wrapper.find('ChildComponent').getElement().props.handleTextColorSliderChange
    ).toBe('function');
  });

  it('should set state with queryParams', (): void => {
    window.history.pushState(
      {},
      'Test Title',
      '/?background=%235E38A8&isLight=false&textColor=%23FFFFFF'
    );
    const newwrapper = shallow(
      <AppContainer title="are my colors accessible">
        {(props): ReactElement => <ChildComponent {...props} />}
      </AppContainer>
    );
    expect(newwrapper.instance().state).toEqual({
      siteData: {
        background: '#5E38A8',
        colorCombos: [
          {
            color: [255, 255, 255],
            combinations: [
              {
                accessibility: { aa: true, aaLarge: true, aaa: true, aaaLarge: true },
                color: [94, 56, 168],
                contrast: 8.055122537045744,
                hex: '#5E38A8',
                model: 'rgb',
                valpha: 1
              }
            ],
            hex: '#FFFFFF',
            model: 'rgb',
            valpha: 1
          },
          {
            color: [94, 56, 168],
            combinations: [
              {
                accessibility: { aa: true, aaLarge: true, aaa: true, aaaLarge: true },
                color: [255, 255, 255],
                contrast: 8.055122537045744,
                hex: '#FFFFFF',
                model: 'rgb',
                valpha: 1
              }
            ],
            hex: '#5E38A8',
            model: 'rgb',
            valpha: 1
          }
        ],
        isLight: false,
        textColor: '#FFFFFF'
      }
    });
  });

  it('should update state when handleBackgroundColorInputChange is called with a hex', (): void => {
    instance.handleBackgroundColorInputChange('#000');
    expect(instance.state.siteData.background).toEqual('#000');
    expect(instance.state.siteData.colorCombos[1].hex).toEqual('#000000');
  });

  it('should not update colorCombos on state when handleBackgroundColorInputChange is called with a non-valid color', (): void => {
    instance.handleBackgroundColorInputChange('tase848ncdnje9k');
    expect(instance.state.siteData.background).toEqual('tase848ncdnje9k');
    expect(instance.state.siteData.colorCombos[1].hex).toEqual('#5E38A8');
  });

  it('should update state with isLight when handleBackgroundColorInputChange is called with a light color', (): void => {
    instance.handleBackgroundColorInputChange('#ccc');
    expect(instance.state.siteData.isLight).toEqual(true);
  });

  it('should update state when handleTextColorInputChange is called with a hex', (): void => {
    instance.handleTextColorInputChange('#fefefe');
    expect(instance.state.siteData.textColor).toEqual('#fefefe');
    expect(instance.state.siteData.colorCombos[0].hex).toEqual('#FEFEFE');
  });

  it('should update the url with the state when updateHash is called', (): void => {
    instance.handleBackgroundColorInputChange('#777');
    instance.handleTextColorInputChange('#ddd');
    instance.updateHash();
    expect(window.location.search).toEqual(
      '?background=%23777&colorCombos=%5Bobject%20Object%5D&colorCombos=%5Bobject%20Object%5D&isLight=false&textColor=%23ddd'
    );
  });
});
