const _ = require('lodash');
const selectorParser = require('postcss-selector-parser');

module.exports = function() {
  return ({ addVariant, config }) => {
    const prefixClass = function(className) {
      const prefix = config('prefix');
      const getPrefix = typeof prefix === 'function' ? prefix : () => prefix;
      return `${getPrefix(`.${className}`)}${className}`;
    };

    const groupPseudoClassVariant = function(pseudoClass) {
      return ({ modifySelectors, separator }) => {
        return modifySelectors(({ selector }) => {
          return selectorParser(selectors => {
            selectors.walkClasses(classNode => {
              classNode.value = `group-${pseudoClass}${separator}${classNode.value}`;
              classNode.parent.insertBefore(classNode, selectorParser().astSync(`.${prefixClass('group')}:${pseudoClass} `));
            });
          }).processSync(selector);
        });
      };
    };

    addVariant('group-focus', groupPseudoClassVariant('focus'));
    addVariant('group-focus-within', groupPseudoClassVariant('focus-within'));
    addVariant('group-active', groupPseudoClassVariant('active'));
    addVariant('group-visited', groupPseudoClassVariant('visited'));
    addVariant('group-disabled', groupPseudoClassVariant('disabled'));

    addVariant('hocus', ({ modifySelectors, separator }) => {
      modifySelectors(({ selector }) => {
        return selectorParser(selectors => {
          const clonedSelectors = selectors.clone();
          [selectors, clonedSelectors].forEach((sel, i) => {
            sel.walkClasses(classNode => {
              classNode.value = `hocus${separator}${classNode.value}`;
              classNode.parent.insertAfter(classNode, selectorParser.pseudo({ value: `:${i === 0 ? 'hover' : 'focus'}` }));
            });
          });
          selectors.append(clonedSelectors);
        }).processSync(selector);
      });
    });

    addVariant('group-hocus', ({ modifySelectors, separator }) => {
      modifySelectors(({ selector }) => {
        return selectorParser(selectors => {
          const clonedSelectors = selectors.clone();
          [selectors, clonedSelectors].forEach((sel, i) => {
            sel.walkClasses(classNode => {
              classNode.value = `group-hocus${separator}${classNode.value}`;
              classNode.parent.insertBefore(classNode, selectorParser().astSync(`.${prefixClass('group')}:${i === 0 ? 'hover' : 'focus'} `));
            });
          });
          selectors.append(clonedSelectors);
        }).processSync(selector)
      });
    });
  };
};
