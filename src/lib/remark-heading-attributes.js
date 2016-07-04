// 参考: https://github.com/wooorm/remark-slug/blob/master/index.js
// TODO: headingだけなので改良したい

const visit = require('unist-util-visit');
/**
 * Patch `value` on `context` at `key`, if
 * `context[key]` does not already exist.
 *
 * @param {Object} context - Context to patch.
 * @param {string} key - Key to patch at.
 * @param {*} value - Value to patch.
 */
function patch(context, key, value) {
  if (!context[key]) {
    context[key] = value;
  }

  return context[key];
}

/**
 * This plugin can be used as `remark.use(plugin, {attributes: { id: "foo" }})`.
 *
 * @param {?Object} options - attributes.
 */
function attacher(processor, options) {
  const attrs = options && options.attributes || {};
  const max = options && options.max || 6;

  function transformer(ast) {
    visit(ast, 'heading', node => {
      if (node.depth > max) return;

      const data = patch(node, 'data', {});
      /* Legacy remark-html */
      patch(data, 'htmlAttributes', {});
      /* Current remark-html */
      patch(data, 'hProperties', {});

      for (const key of Object.keys(attrs)) {
        patch(data.htmlAttributes, key, attrs[key]);
        patch(data.hProperties, key, attrs[key]);
      }
    });
  }

  return transformer;
}

module.exports = attacher;
