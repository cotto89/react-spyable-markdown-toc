'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mdParser = require('./../lib/md-parser.js');

var _mdParser2 = _interopRequireDefault(_mdParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SpyableMarkdownTocWrapper = function (_Component) {
  (0, _inherits3.default)(SpyableMarkdownTocWrapper, _Component);
  (0, _createClass3.default)(SpyableMarkdownTocWrapper, null, [{
    key: 'propTypes',
    get: function get() {
      return {
        raw: _react.PropTypes.string.isRequired,
        children: _react.PropTypes.node.isRequired,
        parseOption: _react.PropTypes.object,
        maxDepth: _react.PropTypes.number
      };
    }
  }, {
    key: 'childContextTypes',
    get: function get() {
      return {
        html: _react.PropTypes.string,
        headingList: _react.PropTypes.array,
        onTocItemClick: _react.PropTypes.func,
        currentIndex: _react.PropTypes.number
      };
    }
  }]);

  function SpyableMarkdownTocWrapper(props) {
    (0, _classCallCheck3.default)(this, SpyableMarkdownTocWrapper);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(SpyableMarkdownTocWrapper).call(this, props));

    _this.state = { currentIndex: 0 };

    /* parser */
    var _this$props = _this.props;
    var raw = _this$props.raw;
    var parseOption = _this$props.parseOption;
    var maxDepth = _this$props.maxDepth;

    _this.initParser({ raw: raw, parseOption: parseOption, maxDepth: maxDepth });

    /* handler */
    _this.handleTocItemClick = _this.handleTocItemClick.bind(_this);
    _this.handleWindowScroll = _this.handleWindowScroll.bind(_this);
    return _this;
  }

  /* context
  ----------------------------------- */


  (0, _createClass3.default)(SpyableMarkdownTocWrapper, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        html: this.parsedHtml,
        headingList: this.headingList,
        currentIndex: this.state.currentIndex,
        onTocItemClick: this.handleTocItemClick
      };
    }

    /* Lifecycle
    ------------------------------------ */

  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.$scrollItems = document.querySelectorAll('[data-spyable-heading=true]');
      window.addEventListener('scroll', this.handleWindowScroll);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_ref) {
      var raw = _ref.raw;
      var parseOption = _ref.parseOption;
      var maxDepth = _ref.maxDepth;

      this.initParser({ raw: raw, parseOption: parseOption, maxDepth: maxDepth });
      this.setState({ currentIndex: 0 });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (prevProps.raw !== this.props.raw) {
        this.$scrollItems = document.querySelectorAll('[data-spyable-heading=true]');
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('scroll', this.handleWindowScroll);
    }

    /* methods
    --------------------------------------*/

  }, {
    key: 'initParser',
    value: function initParser(_ref2) {
      var raw = _ref2.raw;
      var parseOption = _ref2.parseOption;
      var maxDepth = _ref2.maxDepth;

      var headingAttributes = { attributes: { 'data-spyable-heading': true }, max: maxDepth };
      this.parser = new _mdParser2.default({ raw: raw, parseOption: parseOption, headingAttributes: headingAttributes });
      this.parsedHtml = this.parser.toHTML();
      this.headingList = this.parser.headingList;
    }

    /* handler
    ------------------------------------------*/

  }, {
    key: 'handleWindowScroll',
    value: function handleWindowScroll() {
      var baseTop = window.pageYOffset + 30;
      var targets = [];

      Array.prototype.forEach.call(this.$scrollItems, function (elm, i) {
        if (baseTop > elm.offsetTop) targets.push(i);
      });

      var currentIndex = targets[targets.length - 1] || 0;
      this.setState({ currentIndex: currentIndex });
    }
  }, {
    key: 'handleTocItemClick',
    value: function handleTocItemClick(index) {
      var $target = this.$scrollItems[index];
      $target.scrollIntoView();
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'SpyableMarkdownTocWrapper' },
        this.props.children
      );
    }
  }]);
  return SpyableMarkdownTocWrapper;
}(_react.Component);

exports.default = SpyableMarkdownTocWrapper;