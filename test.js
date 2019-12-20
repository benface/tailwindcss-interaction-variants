const _ = require('lodash');
const cssMatcher = require('jest-matcher-css');
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const interactionVariantsPlugin = require('./index.js');

const generatePluginCss = (variants = [], css = null) => {
  return postcss(
    tailwindcss({
      theme: {
        screens: {
          'sm': '640px',
        },
      },
      corePlugins: false,
      plugins: [
        interactionVariantsPlugin(),
        ({ addUtilities }) => {
          addUtilities(css ? css : {
            '.test': {
              'display': 'block',
            },
          }, variants);
        },
      ],
    })
  )
  .process('@tailwind utilities', {
    from: undefined,
  })
  .then(result => {
    return result.css;
  });
};

expect.extend({
  toMatchCss: cssMatcher,
});

test('the plugin doesn’t do anything if the variants aren’t used', () => {
  return generatePluginCss().then(css => {
    expect(css).toMatchCss(`
      .test {
        display: block;
      }
    `);
  });
});

test('the group-focus variant is working', () => {
  return generatePluginCss(['group-focus']).then(css => {
    expect(css).toMatchCss(`
      .test {
        display: block;
      }
      .group:focus .group-focus\\:test {
        display: block;
      }
    `);
  });
});

test('the hocus variant is working', () => {
  return generatePluginCss(['hocus']).then(css => {
    expect(css).toMatchCss(`
      .test {
        display: block;
      }
      .hocus\\:test:hover, .hocus\\:test:focus {
        display: block;
      }
    `);
  });
});

test('the group-hocus variant is working', () => {
  return generatePluginCss(['group-hocus']).then(css => {
    expect(css).toMatchCss(`
      .test {
        display: block;
      }
      .group:hover .group-hocus\\:test, .group:focus .group-hocus\\:test {
        display: block;
      }
    `);
  });
});

test('all the variants are working', () => {
  return generatePluginCss(['responsive', 'group-focus', 'group-focus-within', 'group-active', 'group-visited', 'group-disabled', 'hocus', 'group-hocus']).then(css => {
    expect(css).toMatchCss(`
      .test {
        display: block;
      }
      .group:focus .group-focus\\:test {
        display: block;
      }
      .group:focus-within .group-focus-within\\:test {
        display: block;
      }
      .group:active .group-active\\:test {
        display: block;
      }
      .group:visited .group-visited\\:test {
        display: block;
      }
      .group:disabled .group-disabled\\:test {
        display: block;
      }
      .hocus\\:test:hover, .hocus\\:test:focus {
        display: block;
      }
      .group:hover .group-hocus\\:test, .group:focus .group-hocus\\:test {
        display: block;
      }
      @media (min-width: 640px) {
        .sm\\:test {
          display: block;
        }
        .group:focus .sm\\:group-focus\\:test {
          display: block;
        }
        .group:focus-within .sm\\:group-focus-within\\:test {
          display: block;
        }
        .group:active .sm\\:group-active\\:test {
          display: block;
        }
        .group:visited .sm\\:group-visited\\:test {
          display: block;
        }
        .group:disabled .sm\\:group-disabled\\:test {
          display: block;
        }
        .sm\\:hocus\\:test:hover, .sm\\:hocus\\:test:focus {
          display: block;
        }
        .group:hover .sm\\:group-hocus\\:test, .group:focus .sm\\:group-hocus\\:test {
          display: block;
        }
      }
    `);
  });
});

test('the variants work on utilities that include pseudo-elements', () => {
  return generatePluginCss(['group-focus', 'group-active', 'group-focus-within', 'hocus', 'group-hocus'], {
    '.placeholder-gray-400::placeholder': {
      'color': '#cbd5e0',
    },
  }).then(css => {
    expect(css).toMatchCss(`
      .placeholder-gray-400::placeholder {
        color: #cbd5e0;
      }
      .group:focus .group-focus\\:placeholder-gray-400::placeholder {
        color: #cbd5e0
      }
      .group:active .group-active\\:placeholder-gray-400::placeholder {
        color: #cbd5e0
      }
      .group:focus-within .group-focus-within\\:placeholder-gray-400::placeholder {
        color: #cbd5e0
      }
      .hocus\\:placeholder-gray-400:hover::placeholder, .hocus\\:placeholder-gray-400:focus::placeholder {
        color: #cbd5e0
      }
      .group:hover .group-hocus\\:placeholder-gray-400::placeholder, .group:focus .group-hocus\\:placeholder-gray-400::placeholder {
        color: #cbd5e0
      }
    `);
  });
});
