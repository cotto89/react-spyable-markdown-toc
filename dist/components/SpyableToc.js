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

var _shouldHidden = require('./../lib/shouldHidden.js');

var _shouldHidden2 = _interopRequireDefault(_shouldHidden);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SpyableToc(props, context) {
  var SMT_headingList = context.SMT_headingList;
  var SMT_currentIndex = context.SMT_currentIndex;
  var SMT_onTocItemClick = context.SMT_onTocItemClick;
  var collapse = props.collapse;

  return _react2.default.createElement(
    'div',
    { className: 'SpyableToc' },
    SMT_headingList.map(function (x, i) {
      return _react2.default.createElement(_SpyableTocItem2.default, (0, _extends3.default)({
        key: i,
        index: i,
        current: SMT_currentIndex === i,
        onTocItemClick: SMT_onTocItemClick,
        hidden: collapse && (0, _shouldHidden2.default)(x, i, SMT_currentIndex, SMT_headingList)
      }, x));
    })
  );
} /* eslint-disable camelcase*/


SpyableToc.propTypes = {
  collapse: _react.PropTypes.bool
};

SpyableToc.contextTypes = {
  SMT_headingList: _react.PropTypes.array.isRequired,
  SMT_onTocItemClick: _react.PropTypes.func.isRequired,
  SMT_currentIndex: _react.PropTypes.number
};