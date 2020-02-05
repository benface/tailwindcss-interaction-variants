const _ = require('lodash');
const cssMatcher = require('jest-matcher-css');
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const interactionVariantsPlugin = require('./index.js');

const generatePluginCss = (variants = [], tailwindOptions = {}, css = null) => {
  return postcss(
    tailwindcss({
      theme: {
        screens: {
          'sm': '640px',
        },
      },
      corePlugins: false,
      plugins: [
        interactionVariantsPlugin,
        ({ addUtilities }) => {
          addUtilities(css ? css : {
            '.block': {
              'display': 'block',
            },
          }, variants);
        },
      ],
      ...tailwindOptions,
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
      .block {
        display: block;
      }
    `);
  });
});

test('the checked variant is working', () => {
  return generatePluginCss(['checked']).then(css => {
    expect(css).toMatchCss(`
      .block {
        display: block;
      }
      .checked\\:block:checked {
        display: block;
      }
    `);
  });
});

test('the group-focus variant is working', () => {
  return generatePluginCss(['group-focus']).then(css => {
    expect(css).toMatchCss(`
      .block {
        display: block;
      }
      .group:focus .group-focus\\:block {
        display: block;
      }
    `);
  });
});

test('the hocus variant is working', () => {
  return generatePluginCss(['hocus']).then(css => {
    expect(css).toMatchCss(`
      .block {
        display: block;
      }
      .hocus\\:block:hover, .hocus\\:block:focus {
        display: block;
      }
    `);
  });
});

test('the group-hocus variant is working', () => {
  return generatePluginCss(['group-hocus']).then(css => {
    expect(css).toMatchCss(`
      .block {
        display: block;
      }
      .group:hover .group-hocus\\:block, .group:focus .group-hocus\\:block {
        display: block;
      }
    `);
  });
});

test('all the variants are working', () => {
  return generatePluginCss(['checked', 'group-focus', 'group-focus-within', 'group-active', 'group-visited', 'group-disabled', 'hocus', 'group-hocus']).then(css => {
    expect(css).toMatchCss(`
      .block {
        display: block;
      }
      .checked\\:block:checked {
        display: block;
      }
      .group:focus .group-focus\\:block {
        display: block;
      }
      .group:focus-within .group-focus-within\\:block {
        display: block;
      }
      .group:active .group-active\\:block {
        display: block;
      }
      .group:visited .group-visited\\:block {
        display: block;
      }
      .group:disabled .group-disabled\\:block {
        display: block;
      }
      .hocus\\:block:hover, .hocus\\:block:focus {
        display: block;
      }
      .group:hover .group-hocus\\:block, .group:focus .group-hocus\\:block {
        display: block;
      }
    `);
  });
});

test('all variants can be chained with the responsive variant', () => {
  return generatePluginCss(['checked', 'group-focus', 'group-focus-within', 'group-active', 'group-visited', 'group-disabled', 'hocus', 'group-hocus', 'responsive']).then(css => {
    expect(css).toMatchCss(`
      .block {
        display: block;
      }
      .checked\\:block:checked {
        display: block;
      }
      .group:focus .group-focus\\:block {
        display: block;
      }
      .group:focus-within .group-focus-within\\:block {
        display: block;
      }
      .group:active .group-active\\:block {
        display: block;
      }
      .group:visited .group-visited\\:block {
        display: block;
      }
      .group:disabled .group-disabled\\:block {
        display: block;
      }
      .hocus\\:block:hover, .hocus\\:block:focus {
        display: block;
      }
      .group:hover .group-hocus\\:block, .group:focus .group-hocus\\:block {
        display: block;
      }
      @media (min-width: 640px) {
        .sm\\:block {
          display: block;
        }
        .sm\\:checked\\:block:checked {
          display: block;
        }
        .group:focus .sm\\:group-focus\\:block {
          display: block;
        }
        .group:focus-within .sm\\:group-focus-within\\:block {
          display: block;
        }
        .group:active .sm\\:group-active\\:block {
          display: block;
        }
        .group:visited .sm\\:group-visited\\:block {
          display: block;
        }
        .group:disabled .sm\\:group-disabled\\:block {
          display: block;
        }
        .sm\\:hocus\\:block:hover, .sm\\:hocus\\:block:focus {
          display: block;
        }
        .group:hover .sm\\:group-hocus\\:block, .group:focus .sm\\:group-hocus\\:block {
          display: block;
        }
      }
    `);
  });
});

test('the variants work well with Tailwind’s prefix option', () => {
  return generatePluginCss(['hover', 'checked', 'group-focus', 'hocus', 'group-hocus'], {
    prefix: 'tw-',
  }).then(css => {
    expect(css).toMatchCss(`
      .tw-block {
        display: block;
      }
      .hover\\:tw-block:hover {
        display: block;
      }
      .checked\\:tw-block:checked {
        display: block;
      }
      .tw-group:focus .group-focus\\:tw-block {
        display: block;
      }
      .hocus\\:tw-block:hover, .hocus\\:tw-block:focus {
        display: block;
      }
      .tw-group:hover .group-hocus\\:tw-block, .tw-group:focus .group-hocus\\:tw-block {
        display: block;
      }
    `);
  });
});

test('the variants work on utilities that include pseudo-elements', () => {
  return generatePluginCss(['hover', 'checked', 'group-focus', 'hocus', 'group-hocus'], {}, {
    '.placeholder-gray-400::placeholder': {
      'color': '#cbd5e0',
    },
  }).then(css => {
    expect(css).toMatchCss(`
      .placeholder-gray-400::placeholder {
        color: #cbd5e0;
      }
      .hover\\:placeholder-gray-400:hover::placeholder {
        color: #cbd5e0;
      }
      .checked\\:placeholder-gray-400:checked::placeholder {
        color: #cbd5e0;
      }
      .group:focus .group-focus\\:placeholder-gray-400::placeholder {
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
