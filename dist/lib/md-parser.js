'use strict';

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var remark = require('remark');
var remark2HTML = require('remark-html');
var hljs = require('remark-highlight.js');
var toString = require('mdast-util-to-string');
var attrs = require('./remark-heading-attributes.js');

var MDParser = function () {
  /**
   * Creates an instance of MDParser.
   *
   * @param {string} args.raw - markdown
   * @param {?Object} args.parseOption - remark parse option
   * @param {?Object} args.headingAttributes - for remark-html
   */

  function MDParser(args) {
    (0, _classCallCheck3.default)(this, MDParser);
    var raw = args.raw;
    var parseOption = args.parseOption;
    var headingAttributes = args.headingAttributes;

    this.raw = raw;
    this.parseOption = parseOption || { breaks: true, setext: true };
    this.maxDepth = headingAttributes && headingAttributes.max || 6;
    this.headingAttributes = headingAttributes || {};
  }

  /**
   * heading listを返すgetter
   *
   * @readonly
   * @return {Array} headingList
   *
   *  [
        { depth: 1, value: foo },
        { depth: 2, value: bar },
      ]
   */


  (0, _createClass3.default)(MDParser, [{
    key: 'toHTML',


    /**
     * markdown to HTML with heading attrs
     *
     * @returns {string} html
     */
    value: function toHTML() {
      var html = remark().use(attrs, this.headingAttributes).use([remark2HTML, hljs]).process(this.raw, this.parseOption);

      return html.toString();
    }
  }, {
    key: 'headingList',
    get: function get() {
      var headers = [];
      var ast = remark().parse(this.raw, this.parseOption);

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(ast.children), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var node = _step.value;

          if (node.type === 'heading' && node.depth <= this.maxDepth) {
            headers.push({
              depth: node.depth,
              value: toString(node)
            });
          }
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

      return headers;
    }
  }]);
  return MDParser;
}();

module.exports = MDParser;