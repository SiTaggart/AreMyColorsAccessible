var fs = require('fs');
var path = require('path');

module.exports = plop => {
  plop.setGenerator('component', {
    description: 'Create new component.',
    prompts: [
      {
        type: 'list',
        name: 'type',
        default: 'Stateless',
        message: 'Select the type of component?',
        choices: () => ['Stateless', 'React.PureComponent', 'React.Component']
      },
      {
        type: 'list',
        name: 'parent',
        message: 'Parent folder:',
        default: 'New Component',
        choices: function() {
          const choices = ['New Component'].concat(
            fs.readdirSync(path.join(__dirname, './../../components'))
          );
          const testIndex = choices.indexOf('__tests__');
          if (testIndex > -1) choices.splice(testIndex, 1);
          return choices;
        }
      },
      {
        type: 'input',
        name: 'name',
        message: 'Component name',
        validate: value => {
          if (/.+/.test(value)) {
            return true;
          }
          return 'The name is required';
        }
      }
    ],
    actions: function(data) {
      var folderPath =
        data.parent === 'New Component'
          ? './../components/{{kebabCase name}}'
          : './../components/{{parent}}/{{kebabCase name}}';
      const componentPath = folderPath + '/index.tsx';

      var actions = [
        {
          type: 'add',
          path: folderPath + '/__tests__/index.spec.tsx',
          templateFile: 'component/component.test.tsx.tpl'
        },
        {
          type: 'add',
          path: folderPath + '/index.scss',
          templateFile: 'component/component.scss.tpl'
        }
      ];

      var component = {};

      switch (data.type) {
        case 'Stateless':
          component = {
            type: 'add',
            path: componentPath,
            templateFile: 'component/sfcComponent.tsx.tpl'
          };
          actions = actions.concat(component);
          break;
        case 'React.PureComponent':
          component = {
            type: 'add',
            path: componentPath,
            templateFile: 'component/pureComponent.tsx.tpl'
          };
          actions = actions.concat(component);
          break;
        case 'React.Component':
          component = {
            type: 'add',
            path: componentPath,
            templateFile: 'component/component.tsx.tpl'
          };
          actions = actions.concat(component);
          break;
        default:
          break;
      }

      return actions;
    }
  });
};
