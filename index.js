const plugin = require('tailwindcss/plugin');
const _ = require('lodash');
const selectorParser = require('postcss-selector-parser');

module.exports = plugin(function({ addVariant, config, e, postcss }) {
  const importantSelector = typeof config('important') === 'string' ? config('important') : null;

  const prefixClass = function(className) {
    const prefix = config('prefix');
    const getPrefix = typeof prefix === 'function' ? prefix : () => prefix;
    return `${getPrefix(`.${className}`)}${className}`;
  };

  const pseudoClassVariant = function(pseudoClass) {
    return ({ modifySelectors, separator }) => {
      return modifySelectors(({ selector }) => {
        return selectorParser(selectors => {
          selectors.walkClasses(classNode => {
            classNode.value = `${pseudoClass}${separator}${classNode.value}`;
            classNode.parent.insertAfter(classNode, selectorParser.pseudo({ value: `:${pseudoClass}` }));
          });
        }).processSync(selector);
      });
    };
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

  addVariant('group-focus-within', groupPseudoClassVariant('focus-within'));
  addVariant('group-focus-visible', groupPseudoClassVariant('focus-visible'));
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

  addVariant('can-hover', ({ container, separator }) => {
    const atRule = postcss.atRule({ name: 'media', params: '(hover: hover)' });
    atRule.append(container.nodes);
    container.append(atRule);
    atRule.walkRules(rule => {
      rule.selector = `${importantSelector ? importantSelector + ' ' : ''}.${e(`can-hover${separator}`)}${rule.selector.slice(1 + (importantSelector ? importantSelector.length + 1 : 0))}`;
    });
  });

  addVariant('no-hover', ({ container, separator }) => {
    const atRule = postcss.atRule({ name: 'media', params: '(hover: none)' });
    atRule.append(container.nodes);
    container.append(atRule);
    atRule.walkRules(rule => {
      rule.selector = `${importantSelector ? importantSelector + ' ' : ''}.${e(`no-hover${separator}`)}${rule.selector.slice(1 + (importantSelector ? importantSelector.length + 1 : 0))}`;
    });
  });
});
