'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 参考: https://github.com/wooorm/remark-slug/blob/master/index.js
// TODO: headingだけなので改良したい

var visit = require('unist-util-visit');
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
  var attrs = options && options.attributes || {};
  var max = options && options.max || 6;

  function transformer(ast) {
    visit(ast, 'heading', function (node) {
      if (node.depth > max) return;

      var data = patch(node, 'data', {});
      /* Legacy remark-html */
      patch(data, 'htmlAttributes', {});
      /* Current remark-html */
      patch(data, 'hProperties', {});

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)((0, _keys2.default)(attrs)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var key = _step.value;

          patch(data.htmlAttributes, key, attrs[key]);
          patch(data.hProperties, key, attrs[key]);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    });
  }

  return transformer;
}

module.exports = attacher;