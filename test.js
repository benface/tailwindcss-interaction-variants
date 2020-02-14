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
            '.w-1\\/2': {
              'width': '50%',
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
      .w-1\\/2 {
        width: 50%;
      }
    `);
  });
});

test('the checked variant is working', () => {
  return generatePluginCss(['checked']).then(css => {
    expect(css).toMatchCss(`
      .w-1\\/2 {
        width: 50%;
      }
      .checked\\:w-1\\/2:checked {
        width: 50%;
      }
    `);
  });
});

test('the group-focus variant is working', () => {
  return generatePluginCss(['group-focus']).then(css => {
    expect(css).toMatchCss(`
      .w-1\\/2 {
        width: 50%;
      }
      .group:focus .group-focus\\:w-1\\/2 {
        width: 50%;
      }
    `);
  });
});

test('the hocus variant is working', () => {
  return generatePluginCss(['hocus']).then(css => {
    expect(css).toMatchCss(`
      .w-1\\/2 {
        width: 50%;
      }
      .hocus\\:w-1\\/2:hover, .hocus\\:w-1\\/2:focus {
        width: 50%;
      }
    `);
  });
});

test('the group-hocus variant is working', () => {
  return generatePluginCss(['group-hocus']).then(css => {
    expect(css).toMatchCss(`
      .w-1\\/2 {
        width: 50%;
      }
      .group:hover .group-hocus\\:w-1\\/2, .group:focus .group-hocus\\:w-1\\/2 {
        width: 50%;
      }
    `);
  });
});

test('the can-hover variant is working', () => {
  return generatePluginCss(['can-hover']).then(css => {
    expect(css).toMatchCss(`
      .w-1\\/2 {
        width: 50%;
      }
      @media (hover: hover) {
        .can-hover\\:w-1\\/2 {
          width: 50%;
        }
      }
    `);
  });
});

test('the no-hover variant is working', () => {
  return generatePluginCss(['no-hover']).then(css => {
    expect(css).toMatchCss(`
      .w-1\\/2 {
        width: 50%;
      }
      @media (hover: none) {
        .no-hover\\:w-1\\/2 {
          width: 50%;
        }
      }
    `);
  });
});

test('all the variants are working', () => {
  return generatePluginCss(['checked', 'group-focus', 'group-focus-within', 'group-active', 'group-visited', 'group-disabled', 'hocus', 'group-hocus', 'can-hover', 'no-hover']).then(css => {
    expect(css).toMatchCss(`
      .w-1\\/2 {
        width: 50%;
      }
      .checked\\:w-1\\/2:checked {
        width: 50%;
      }
      .group:focus .group-focus\\:w-1\\/2 {
        width: 50%;
      }
      .group:focus-within .group-focus-within\\:w-1\\/2 {
        width: 50%;
      }
      .group:active .group-active\\:w-1\\/2 {
        width: 50%;
      }
      .group:visited .group-visited\\:w-1\\/2 {
        width: 50%;
      }
      .group:disabled .group-disabled\\:w-1\\/2 {
        width: 50%;
      }
      .hocus\\:w-1\\/2:hover, .hocus\\:w-1\\/2:focus {
        width: 50%;
      }
      .group:hover .group-hocus\\:w-1\\/2, .group:focus .group-hocus\\:w-1\\/2 {
        width: 50%;
      }
      @media (hover: hover) {
        .can-hover\\:w-1\\/2 {
          width: 50%;
        }
      }
      @media (hover: none) {
        .no-hover\\:w-1\\/2 {
          width: 50%;
        }
      }
    `);
  });
});

test('all variants can be chained with the responsive variant', () => {
  return generatePluginCss(['checked', 'group-focus', 'group-focus-within', 'group-active', 'group-visited', 'group-disabled', 'hocus', 'group-hocus', 'can-hover', 'no-hover', 'responsive']).then(css => {
    expect(css).toMatchCss(`
      .w-1\\/2 {
        width: 50%;
      }
      .checked\\:w-1\\/2:checked {
        width: 50%;
      }
      .group:focus .group-focus\\:w-1\\/2 {
        width: 50%;
      }
      .group:focus-within .group-focus-within\\:w-1\\/2 {
        width: 50%;
      }
      .group:active .group-active\\:w-1\\/2 {
        width: 50%;
      }
      .group:visited .group-visited\\:w-1\\/2 {
        width: 50%;
      }
      .group:disabled .group-disabled\\:w-1\\/2 {
        width: 50%;
      }
      .hocus\\:w-1\\/2:hover, .hocus\\:w-1\\/2:focus {
        width: 50%;
      }
      .group:hover .group-hocus\\:w-1\\/2, .group:focus .group-hocus\\:w-1\\/2 {
        width: 50%;
      }
      @media (hover: hover) {
        .can-hover\\:w-1\\/2 {
          width: 50%;
        }
      }
      @media (hover: none) {
        .no-hover\\:w-1\\/2 {
          width: 50%;
        }
      }
      @media (min-width: 640px) {
        .sm\\:w-1\\/2 {
          width: 50%;
        }
        .sm\\:checked\\:w-1\\/2:checked {
          width: 50%;
        }
        .group:focus .sm\\:group-focus\\:w-1\\/2 {
          width: 50%;
        }
        .group:focus-within .sm\\:group-focus-within\\:w-1\\/2 {
          width: 50%;
        }
        .group:active .sm\\:group-active\\:w-1\\/2 {
          width: 50%;
        }
        .group:visited .sm\\:group-visited\\:w-1\\/2 {
          width: 50%;
        }
        .group:disabled .sm\\:group-disabled\\:w-1\\/2 {
          width: 50%;
        }
        .sm\\:hocus\\:w-1\\/2:hover, .sm\\:hocus\\:w-1\\/2:focus {
          width: 50%;
        }
        .group:hover .sm\\:group-hocus\\:w-1\\/2, .group:focus .sm\\:group-hocus\\:w-1\\/2 {
          width: 50%;
        }
        @media (hover: hover) {
          .sm\\:can-hover\\:w-1\\/2 {
            width: 50%;
          }
        }
        @media (hover: none) {
          .sm\\:no-hover\\:w-1\\/2 {
            width: 50%;
          }
        }
      }
    `);
  });
});

test('the variants work well with Tailwind’s prefix option', () => {
  return generatePluginCss(['hover', 'checked', 'group-focus', 'hocus', 'group-hocus', 'can-hover', 'no-hover'], {
    prefix: 'tw-',
  }).then(css => {
    expect(css).toMatchCss(`
      .tw-w-1\\/2 {
        width: 50%;
      }
      .hover\\:tw-w-1\\/2:hover {
        width: 50%;
      }
      .checked\\:tw-w-1\\/2:checked {
        width: 50%;
      }
      .tw-group:focus .group-focus\\:tw-w-1\\/2 {
        width: 50%;
      }
      .hocus\\:tw-w-1\\/2:hover, .hocus\\:tw-w-1\\/2:focus {
        width: 50%;
      }
      .tw-group:hover .group-hocus\\:tw-w-1\\/2, .tw-group:focus .group-hocus\\:tw-w-1\\/2 {
        width: 50%;
      }
      @media (hover: hover) {
        .can-hover\\:tw-w-1\\/2 {
          width: 50%;
        }
      }
      @media (hover: none) {
        .no-hover\\:tw-w-1\\/2 {
          width: 50%;
        }
      }
    `);
  });
});

test('the variants work on utilities that include pseudo-elements', () => {
  return generatePluginCss(['hover', 'checked', 'group-focus', 'hocus', 'group-hocus', 'can-hover', 'no-hover'], {}, {
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
        color: #cbd5e0;
      }
      .hocus\\:placeholder-gray-400:hover::placeholder, .hocus\\:placeholder-gray-400:focus::placeholder {
        color: #cbd5e0;
      }
      .group:hover .group-hocus\\:placeholder-gray-400::placeholder, .group:focus .group-hocus\\:placeholder-gray-400::placeholder {
        color: #cbd5e0;
      }
      @media (hover: hover) {
        .can-hover\\:placeholder-gray-400::placeholder {
          color: #cbd5e0;
        }
      }
      @media (hover: none) {
        .no-hover\\:placeholder-gray-400::placeholder {
          color: #cbd5e0;
        }
      }
    `);
  });
});
