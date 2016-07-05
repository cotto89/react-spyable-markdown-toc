"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SpyableMarkdownPreview;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SpyableMarkdownPreview(props, context) {
  return _react2.default.createElement("div", {
    className: "SpyableMarkdownPreview",
    dangerouslySetInnerHTML: { __html: context.html }
  });
}

SpyableMarkdownPreview.contextTypes = {
  html: _react.PropTypes.string
};