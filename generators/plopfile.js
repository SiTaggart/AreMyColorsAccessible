var component = require('./component/component.generator');
var page = require('./page/page.generator');

module.exports = plop => {
  plop.setWelcomeMessage('Would you like to add a component or a page?');
  component(plop);
  page(plop);
};
