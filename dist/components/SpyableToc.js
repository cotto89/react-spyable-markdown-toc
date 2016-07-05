'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = SpyableToc;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SpyableTocItem = require('./SpyableTocItem.js');

var _SpyableTocItem2 = _interopRequireDefault(_SpyableTocItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SpyableToc(props, context) {
  var currentIndex = context.currentIndex;
  var onTocItemClick = context.onTocItemClick;

  return _react2.default.createElement(
    'div',
    { className: 'SpyableToc' },
    context.headingList.map(function (x, i) {
      return _react2.default.createElement(_SpyableTocItem2.default, (0, _extends3.default)({
        key: i,
        index: i,
        current: currentIndex === i,
        onTocItemClick: onTocItemClick
      }, x));
    })
  );
}

SpyableToc.contextTypes = {
  headingList: _react.PropTypes.array.isRequired,
  onTocItemClick: _react.PropTypes.func.isRequired,
  currentIndex: _react.PropTypes.number
};