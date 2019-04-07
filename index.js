const _ = require('lodash');

module.exports = function() {
  return ({ addVariant, e }) => {
    addVariant('hocus', ({ modifySelectors, separator }) => {
      modifySelectors(({ className }) => {
        return `.${e(`hocus${separator}${className}`)}:hover, .${e(`hocus${separator}${className}`)}:focus`;
      });
    });

    addVariant('group-hocus', ({ modifySelectors, separator }) => {
      modifySelectors(({ className }) => {
        return `.group:hover .${e(`group-hocus${separator}${className}`)}, .group:focus .${e(`group-hocus${separator}${className}`)}`;
      });
    });

    addVariant('group-focus', ({ modifySelectors, separator }) => {
      modifySelectors(({ className }) => {
        return `.group:focus .${e(`group-focus${separator}${className}`)}`;
      });
    });

    addVariant('group-active', ({ modifySelectors, separator }) => {
      modifySelectors(({ className }) => {
        return `.group:active .${e(`group-active${separator}${className}`)}`;
      });
    });
    
    addVariant('visited', ({ modifySelectors, separator }) => {
      modifySelectors(({ className }) => {
        return `.${e(`visited${separator}${className}`)}:visited`;
      });
    });
  };
};
