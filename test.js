const _ = require('lodash');
const cssMatcher = require('jest-matcher-css');
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const defaultConfig = require('tailwindcss/defaultConfig')();
const interactionVariantsPlugin = require('./index.js');

const disabledModules = {};
Object.keys(defaultConfig.modules).forEach(module => {
  disabledModules[module] = false;
});

const generatePluginCss = (variants = []) => {
  return postcss(tailwindcss({
    modules: disabledModules,
    plugins: [
      interactionVariantsPlugin(),
      ({ e, addUtilities }) => {
        addUtilities({
          '.test': {
            'display': 'none',
          },
        }, variants);
      },
    ],
  })).process('@tailwind utilities;', {
    from: undefined,
  }).then(result => {
    return result.css;
  });
};

expect.extend({
  toMatchCss: cssMatcher,
});

test('the plugin doesn’t do anything if the variants aren’t used', () => {
  return generatePluginCss([]).then(css => {
    expect(css).toMatchCss(`
      .test {
        display: none;
      }
    `);
  });
});

test('the hocus variant is working', () => {
  return generatePluginCss(['hocus']).then(css => {
    expect(css).toMatchCss(`
      .test {
        display: none;
      }
      .hocus\\:test:hover, .hocus\\:test:focus {
        display: none;
      }
    `);
  });
});

test('the group-hocus variant is working', () => {
  return generatePluginCss(['group-hocus']).then(css => {
    expect(css).toMatchCss(`
      .test {
        display: none;
      }
      .group:hover .group-hocus\\:test, .group:focus .group-hocus\\:test {
        display: none;
      }
    `);
  });
});

test('the group-focus variant is working', () => {
  return generatePluginCss(['group-focus']).then(css => {
    expect(css).toMatchCss(`
      .test {
        display: none;
      }
      .group:focus .group-focus\\:test {
        display: none;
      }
    `);
  });
});

test('the group-active variant is working', () => {
  return generatePluginCss(['group-active']).then(css => {
    expect(css).toMatchCss(`
      .test {
        display: none;
      }
      .group:active .group-active\\:test {
        display: none;
      }
    `);
  });
});

test('the visited variant is working', () => {
  return generatePluginCss(['visited']).then(css => {
    expect(css).toMatchCss(`
      .test {
        display: none;
      }
      .visited\\:test:visited {
        display: none;
      }
    `);
  });
});

test('multiple variants can be used together', () => {
  return generatePluginCss(['hocus', 'group-active', 'group-focus']).then(css => {
    expect(css).toMatchCss(`
    .test {
      display: none;
    }
    .hocus\\:test:hover, .hocus\\:test:focus {
      display: none;
    }
    .group:active .group-active\\:test {
      display: none;
    }
    .group:focus .group-focus\\:test {
      display: none;
    }
    `);
  });
});
