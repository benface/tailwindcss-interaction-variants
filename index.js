const _ = require('lodash');

module.exports = () => ({ e, addVariant }) => {
  addVariant('hocus', ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      return `.hocus${separator}${className}:hover, .hocus${separator}${className}:focus`;
    });
  });
  addVariant('group-hocus', ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      return `.group:hover .group-hocus${separator}${className}, .group:focus .group-hocus${separator}${className}`;
    });
  });
  addVariant('group-focus', ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      return `.group:focus .group-focus${separator}${className}`;
    });
  });
  addVariant('group-active', ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      return `.group:active .group-active${separator}${className}`;
    });
  });
  addVariant('visited', ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      return `.visited${separator}${className}:visited`;
    });
  });
};
