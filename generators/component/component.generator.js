const fs = require('fs');
const path = require('path');

module.exports = (plop) => {
  plop.setGenerator('component', {
    description: 'Create new component.',
    prompts: [
      {
        type: 'list',
        name: 'type',
        default: 'Function',
        message: 'Select the type of component?',
        choices: () => ['Function'],
      },
      {
        type: 'list',
        name: 'parent',
        message: 'Parent folder:',
        default: 'New Component',
        choices() {
          // eslint-disable-next-line unicorn/prefer-spread
          const choices = ['New Component'].concat(
            fs.readdirSync(path.join(__dirname, './../../components'))
          );
          const testIndex = choices.indexOf('__tests__');
          if (testIndex > -1) choices.splice(testIndex, 1);
          return choices;
        },
      },
      {
        type: 'input',
        name: 'name',
        message: 'Component name',
        validate: (value) => {
          if (/.+/.test(value)) {
            return true;
          }
          return 'The name is required';
        },
      },
    ],
    actions(data) {
      const folderPath =
        data.parent === 'New Component'
          ? './../components/{{kebabCase name}}'
          : './../components/{{parent}}/{{kebabCase name}}';
      const componentPath = `${folderPath}/index.tsx`;

      let actions = [
        {
          type: 'add',
          path: `${folderPath}/__tests__/index.spec.tsx`,
          templateFile: 'component/component.test.tsx.tpl',
        },
      ];

      let component = {};

      switch (data.type) {
        case 'Function':
        default:
          component = {
            type: 'add',
            path: componentPath,
            templateFile: 'component/sfcComponent.tsx.tpl',
          };
          // eslint-disable-next-line unicorn/prefer-spread
          actions = actions.concat(component);
          break;
      }

      return actions;
    },
  });
};
