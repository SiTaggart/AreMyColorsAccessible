/* eslint-env jest */
/* eslint-disable import/first */

// Needed for Enzyme
global.requestAnimationFrame = cb => setTimeout(cb, 0);

import enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

enzyme.configure({ adapter: new EnzymeAdapter() });
