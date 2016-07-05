'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TocItem = function (_React$Component) {
  (0, _inherits3.default)(TocItem, _React$Component);

  function TocItem() {
    (0, _classCallCheck3.default)(this, TocItem);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(TocItem).apply(this, arguments));
  }

  (0, _createClass3.default)(TocItem, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return this.props !== nextProps;
    }
  }, {
    key: 'render',
    value: function render() {
      var _classNames;

      var _props = this.props;
      var value = _props.value;
      var depth = _props.depth;
      var index = _props.index;
      var current = _props.current;
      var onTocItemClick = _props.onTocItemClick;

      var cname = (0, _classnames2.default)((_classNames = {
        SpyableTocItem: true
      }, (0, _defineProperty3.default)(_classNames, 'SpyableTocItem__depth-' + depth, true), (0, _defineProperty3.default)(_classNames, 'SpyableTocItem--current', current), _classNames));

      return _react2.default.createElement(
        'div',
        { className: cname, onClick: function onClick(ev) {
            return onTocItemClick(index, ev);
          } },
        value
      );
    }
  }], [{
    key: 'propTypes',
    get: function get() {
      return {
        value: _react.PropTypes.string.isRequired,
        depth: _react.PropTypes.number.isRequired,
        index: _react.PropTypes.number.isRequired,
        current: _react.PropTypes.bool.isRequired,
        onTocItemClick: _react.PropTypes.func.isRequired
      };
    }
  }]);
  return TocItem;
}(_react2.default.Component);

exports.default = TocItem;