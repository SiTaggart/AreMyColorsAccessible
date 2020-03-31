module.exports = (plop) => {
  plop.setGenerator('page', {
    description: 'Create new Page',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'title of page',
        validate: (value) => {
          if (/.+/.test(value)) {
            return true;
          }
          return 'The title is required';
        },
      },
    ],
    actions() {
      const actions = [
        {
          type: 'add',
          path: './../pages/__tests__/{{kebabCase name}}.spec.tsx',
          templateFile: 'page/page.test.tsx.tpl',
        },
        {
          type: 'add',
          path: './../pages/{{kebabCase name}}.tsx',
          templateFile: 'page/pageComponent.tsx.tpl',
        },
      ];

      return actions;
    },
  });
};
