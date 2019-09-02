const _ = require('lodash');
const selectorParser = require('postcss-selector-parser');

const groupPseudoClassVariant = function(pseudoClass) {
  return ({ modifySelectors, separator }) => {
    return modifySelectors(({ selector }) => {
      return selectorParser(selectors => {
        selectors.walkClasses(classNode => {
          classNode.value = `group-${pseudoClass}${separator}${classNode.value}`;
          classNode.parent.insertBefore(classNode, selectorParser().astSync(`.group:${pseudoClass} `));
        });
      }).processSync(selector);
    });
  };
};

module.exports = function() {
  return ({ addVariant, e }) => {
    addVariant('group-focus', groupPseudoClassVariant('focus'));
    addVariant('group-active', groupPseudoClassVariant('active'));

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
              classNode.parent.insertBefore(classNode, selectorParser().astSync(`.group:${i === 0 ? 'hover' : 'focus'} `));
            });
          });
          selectors.append(clonedSelectors);
        }).processSync(selector)
      });
    });
  };
};
