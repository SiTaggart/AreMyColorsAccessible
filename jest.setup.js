/* eslint-env jest */
const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

// Needed for Enzyme
// eslint-disable-next-line @typescript-eslint/no-implied-eval
global.requestAnimationFrame = (cb) => setTimeout(cb, 0);

Enzyme.configure({ adapter: new Adapter() });
